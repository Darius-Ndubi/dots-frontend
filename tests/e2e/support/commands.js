// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Login Command
Cypress.Commands.add('login', (username, password) => {
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
