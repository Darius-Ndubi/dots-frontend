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

/**
 * Create a new user using django admin
 * @param   {String}    username   The string username for the new user
 * @param   {String}    password   The string password for the new user
 */
// [TODO: add First name and Last and also current time stamp for the creation date]
Cypress.Commands.add('apiDACreateUser', (username, password, email = '') => {
  cy.request(`${Cypress.env().beUrl}core/user/`).then(res => {
    let userNotExists = true

    const links = Cypress.$(res.body).find('a')

    links.each(index => {
      if (Cypress.$(links[index]).text() === username) {
        userNotExists = false
      }
    })

    if (userNotExists) {
      cy.request({
        method: 'POST',
        url: `${Cypress.env().beUrl}core/user/add/`,
        failOnStatusCode: false,
        form: true,
        body: {
          csrfmiddlewaretoken: window.csrfToken,
          password: password,
          username: username,
          email: email,
          is_active: 'on',
          date_joined_0: '2020-06-19',
          date_joined_1: '00:21:44',
          'initial-date_joined_0': '2020-06-19',
          'initial-date_joined_1': '00:21:44',
          _save: 'Save'
        },
        headers: {
          Referer: `${Cypress.env().beUrl}core/user/`
        }
      }).then(res => {
        expect(res.status).to.eq(200)
        const $html = Cypress.$(res.body)
        const success = $html.find("li[class='success']").text()
        expect(success).to.eq(`The user "${username}" was added successfully.`)
      })
    } else {
      cy.log(`User Not Created: Username "${username}" already exists.`)
    }
  })
})
