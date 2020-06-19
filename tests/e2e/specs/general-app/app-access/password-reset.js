/* eslint-disable indent */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Valid and invalid login', () => {
  let data
  before(() => {
    cy.fixture('data.json').then(test_data => {
      data = test_data
    })
    cy.apiDeleteALLEmails()
  })

  it('successfully reset passowrd', () => {
    const newPassword = `${data.newPassword}_cHang3d&`
    cy.apiDALogin(data.admin, data.adminPassword)
    cy.apiDACreateUser(data.newUN, data.newPassword, data.newEmail)

    cy.visit('/')

    cy.get('.forgot-password').click()

    cy.get('.title').should('contain', 'Reset your password')
    cy.get('.body-2-reg').should(
      'contain',
      "Enter your user account's email address and we will send you a password reset link."
    )

    cy.get('.el-input__inner').type(data.newEmail)
    cy.get('.el-button').click()

    cy.get('.el-message__content').should(
      'contain',
      'An email has been sent. Please check your email.'
    )

    cy.apiGetLinkFromEmail(
      'Reset Your Password',
      'Choose a new password',
      0
    ).then(url => {
      cy.visit(`reset/${url.split('/')[4]}`)
      cy.get('.title').should('contain', 'Set new password')

      cy.get('[for="new_password"]')
        .siblings()
        .find('input')
        .type(newPassword)
        .should('have.value', newPassword)
      cy.get('[for="confirm_new_password"]')
        .siblings()
        .find('input')
        .type(newPassword)
        .should('have.value', newPassword)
      cy.get('.el-button').click()

      cy.get('.el-message__content').should(
        'contain',
        'Password reset successfully'
      )

      cy.login(data.newUN, newPassword)
      cy.get('.brand').should('exist')
      cy.get('h1').should('contain', 'Dots')
    })
  })
})
