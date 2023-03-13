describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'kaarlek',
      password: 'salasana',
      name: 'Kaarle'
    }

    const user2 = {
      username: 'kuurlek',
      password: 'salasana',
      name: 'Kuurle'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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

    describe('when logged in', function() {
      beforeEach(function () {
        cy.login({ username: 'kaarlek', password: 'salasana' })
        cy.visit('')
      })

      it('a blog can be created', function() {
        cy.get('#show-button').click()
        cy.get('#title').type('Huippu teos')
        cy.get('#author').type('Niilo')
        cy.get('#blog-url').type('http://google.com')
        cy.get('#submit-button').click()

        cy.contains('Huippu teos')
      })

      describe('when a blog exists', function() {
        beforeEach(function() {
          const newBlog = {
            title: 'Mullistava teos',
            author: 'Niilo',
            url: 'http://google.com',
            user: JSON.parse(localStorage.getItem('loggedBlogappUser'))
          }
          cy.createBlog(newBlog)
          cy.visit('')
        })

        it('blogs can be liked', function() {
          cy.contains('Niilo')
            .contains('view').click()

          cy.contains('likes 0')
            .contains('like').click()
          cy.contains('likes 1')
        })

        it('creator can delete blog', function() {
          cy.contains('Niilo')
            .contains('view').click()

          cy.contains('delete').click()

          cy.contains('Mullistava teos').should('not.exist')
        })

        it('delete button appears only to creator', function() {
          cy.login({ username: 'kuurlek', password: 'salasana' })
          cy.contains('Niilo')
            .contains('view').click()

          cy.contains('delete').should('not.exist')
        })
      })
    })
  })
})