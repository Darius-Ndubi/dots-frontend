/* eslint-disable indent */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Valid and invalid login', () => {
  context('Valid login', () => {
    let data
    before(() => {
      cy.fixture('data.json').then(test_data => {
        data = test_data
      })
    })

    it('Logs in successfully.', () => {
      cy.visit('/')

      cy.login(data.admin, data.adminPassowrd)
      cy.get('.brand').should('exist')
      cy.get('h1').should('contain', 'Dots')
    })
  })

  context('Invalid login', () => {
    const invalidTests = [
      {
        test: '"required field" error for both username and password fields',
        username: '',
        password: '',
        error: 'This field is required',
        errorLocator: '.el-form-item__error',
        errorCount: 2
      },
      {
        test: '"required field" error for the username field',
        username: '',
        password: 'password',
        error: 'This field is required',
        errorLocator: '.el-form-item__error',
        errorCount: 1
      },
      {
        test: '"required field" error for the password field',
        username: 'user',
        password: '',
        error: 'This field is required',
        errorLocator: '.el-form-item__error',
        errorCount: 1
      },
      {
        test: '"no active account found" error (username and password invalid)',
        username: 'wrongUsername',
        password: 'wrongPassword',
        error: 'No active account found with the given credentials',
        errorLocator: '.el-message__content',
        errorCount: 1
      },
      {
        test: '"no active account found" error (password invalid)',
        username: 'qa-dots',
        password: 'wrongPassword',
        error: 'No active account found with the given credentials',
        errorLocator: '.el-message__content',
        errorCount: 1
      }
    ]

    beforeEach(() => {
      cy.visit('/')
    })

    invalidTests.forEach(test => {
      it(`Throws ${test.test}.`, () => {
        test.username === ''
          ? cy.log('username empty')
          : cy
              .get('[placeholder="Email or username"]')
              .type(test.username)
              .should('have.value', test.username)
        test.password === ''
          ? cy.log('password empty')
          : cy
              .get('[placeholder="Password"]')
              .type(test.password)
              .should('have.value', test.password)
        cy.get('button')
          .contains('Log in')
          .click()
        cy.get(test.errorLocator).should($error => {
          expect($error.text()).to.contain(test.error)
          expect($error).to.have.length(test.errorCount)
        })
      })
    })
  })
})
