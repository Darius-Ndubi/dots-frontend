// Bypass UI login and login using CSRF Tokens
Cypress.Commands.add('apiDALogin', (username, password) => {
  cy.apiDALogout()
  cy.request(Cypress.env().beUrl).then(res => {
    const $html = Cypress.$(res.body)
    const csrfToken = $html.find('input[name="csrfmiddlewaretoken"]').val()
    cy.request({
      method: 'POST',
      url: `${Cypress.env().beUrl}login/?next=/admin/`,
      failOnStatusCode: false, // dont fail so we can make assertions
      form: true, // we are submitting a regular form body
      body: {
        username,
        password,
        csrfmiddlewaretoken: csrfToken // insert this as part of form body
      },
      headers: {
        Referer: Cypress.env().beUrl
      }
    }).then(res => {
      expect(res.status).to.eq(200)
      cy.request(`${Cypress.env().beUrl}core/user/`).then(res => {
        const csrfToken = res.headers['set-cookie'][0].split(';')[0]
        window.csrfToken = csrfToken.split('=')[1]
      })
    })
  })
})

//
/**
 * Logout into django Admin
 */
Cypress.Commands.add('apiDALogout', () => {
  cy.request(`${Cypress.env().beUrl}logout/`)
})

/**
 * Delete a user using django admin [TODO]: Ensure exact user is deleted
 * @param   {String}    username   The string username to delete
 */
Cypress.Commands.add('apiDADeleteUser', username => {
  cy.request(`${Cypress.env().beUrl}core/user/`).then(res => {
    const link = Cypress.$(res.body)
      .find(`a:contains('${username}')`)
      .attr('href')

    if (link) {
      const id = link.split('/')[4]

      cy.request({
        method: 'POST',
        url: `${Cypress.env().beUrl}core/user/`,
        failOnStatusCode: false,
        form: true,
        body: {
          csrfmiddlewaretoken: window.csrfToken,
          _selected_action: id,
          action: 'delete_selected',
          post: 'yes'
        },
        headers: {
          Referer: `${Cypress.env().beUrl}core/user/`
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        const $html = Cypress.$(res.body)
        const success = $html.find("li[class='success']").text()
        expect(success).to.eq('Successfully deleted 1 user.')
      })
    } else {
      cy.log(`Username ${username} does not exists.`)
    }
  })
})
