// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Registration', () => {
  let data
  const regDetails = (newFN, newLN, newUN, newEmail, newPassword) => {
    cy.get('.register').click()

    cy.get('[for="first_name"]')
      .siblings()
      .find('input')
      .type(data.newFN)
      .should('have.value', newFN)
    cy.get('[for="last_name"]')
      .siblings()
      .find('input')
      .type(newLN)
      .should('have.value', newLN)
    cy.get('[for="username"]')
      .siblings()
      .find('input')
      .type(newUN)
      .should('have.value', newUN)
    cy.get('[for="email"]')
      .siblings()
      .find('input')
      .type(newEmail)
      .should('have.value', newEmail)
    cy.get('[for="password"]')
      .siblings()
      .find('input')
      .type(newPassword)
      .should('have.value', newPassword)
    cy.get('[for="confirm_password"]')
      .siblings()
      .find('input')
      .type(newPassword)
      .should('have.value', newPassword)
  }

  before(() => {
    cy.fixture('data.json').then(test_data => {
      data = test_data
    })
    cy.apiDeleteALLEmails()
  })

  it('Registers a new account successfully.', () => {
    let verifyLink

    cy.apiDALogin(data.admin, data.adminPassword)
    cy.apiDADeleteUser(data.newUN)

    cy.visit('/')
    regDetails(
      data.newFN,
      data.newLN,
      data.newUN,
      data.newEmail,
      data.newPassword
    )
    cy.get('button')
      .contains('Register')
      .click()

    cy.get('.title').should('contain', 'Thank you for registering!')
    cy.contains(
      'Please confirm your email to log in to the application.'
    ).should('exist')

    // Check if a user can login before email verifcation
    cy.login(data.newUN, data.newPassword)
    cy.get(
      '.el-alert--error > .el-alert__content > .el-alert__description'
    ).should('contain', 'Please verify your email before logging in')

    // Verify Email
    cy.apiGetLinkFromEmail('Verify Your Email', 'Confirm email', 0).then(
      res => {
        verifyLink = res
      }
    )

    cy.get('a')
      .contains('Resend Email')
      .click()

    cy.get(
      '.el-alert--success > .el-alert__content > .el-alert__description'
    ).should('contain', 'An email has been sent. Please check your email.')

    cy.apiGetLinkFromEmail('Verify Your Email', 'Confirm email', 1).then(
      res => {
        cy.log(res)
        verifyLink = res
        cy.visit(`activate/${verifyLink.split('/')[4]}`)
      }
    )
    cy.get('[style=""] > .title').should(
      'contain',
      'Your account has been verified!'
    )
    cy.get('button')
      .contains('Log in')
      .click()
    cy.login(data.newUN, data.newPassword)
    cy.get('.brand').should('exist')
    cy.get('h1').should('contain', 'Dots')
  })

  it('Fails to register with existing account.', () => {
    cy.visit('/')
    regDetails(
      data.newFN,
      data.newLN,
      data.admin,
      data.newEmail,
      data.newPassword
    )
    cy.get('button')
      .contains('Register')
      .click()

    cy.contains('Error: Request failed with status code 400')

    // [TODO] Change error message when https://github.com/hikaya-io/dots-frontend/issues/89 is fixed
  })
})
