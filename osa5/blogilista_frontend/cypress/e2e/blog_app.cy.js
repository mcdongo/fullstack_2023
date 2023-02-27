describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'kaarlek',
      password: 'salasana',
      name: 'Kaarle'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('')
  })

  it('Login form shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('kaarlek')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('kaarlek logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('kaarlek')
      cy.get('#password').type('saloasana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})