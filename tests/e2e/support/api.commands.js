// API Login Command
Cypress.Commands.add('apiLogin', (username, password) => {
  cy.get('.heading').should('contain', 'Log in to Dots')
  cy.get('[placeholder="Email or username"]')
    .type(username)
    .should('have.value', username)
  cy.get('[placeholder="Password"]')
    .type(password)
    .should('have.value', password)
  cy.get('button')
    .contains('Log in')
    .click()
})

// /////////////////////////////////////// Custom MailSlurp API commands /////////////////////////////////////////
const { MailSlurp } = require('mailslurp-client')

const mailslurp = new MailSlurp({
  apiKey: Cypress.env('apiKeyMailslurp')
})

// Fetch email by it index (0 based index)
Cypress.Commands.add('apiGetEmail', count => {
  const email = mailslurp.waitForNthEmail(
    Cypress.env('mailslurpInbox'),
    count,
    30000
  )
  return email
})

// Delete all emails
Cypress.Commands.add('apiDeleteALLEmails', () => {
  mailslurp.getEmails(Cypress.env('mailslurpInbox')).then(mails => {
    mails.forEach(mail => {
      mailslurp.deleteEmail(mail.id)
    })
  })
})

// Extract notifcation link from email
Cypress.Commands.add('apiGetLinkFromEmail', (subject, link_title, count) => {
  cy.apiGetEmail(count).then(email => {
    expect(email.subject).to.equal(subject)
    const html = Cypress.$(email.body)
    const links = html.find('a.mcnButton')
    let link_url

    links.each(index => {
      if (links[index].title === link_title) {
        link_url = links[index].href
      }
    })

    if (link_url) {
      return link_url
    } else {
      expect(link_url).to.not.equal(undefined)
    }
  })
})
