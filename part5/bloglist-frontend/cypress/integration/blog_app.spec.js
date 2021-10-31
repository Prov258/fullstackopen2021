describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Vasiliy',
			username: 'vasya',
			password: 'hardpassword'
		}
		cy.request('POST', 'http://localhost:3001/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('Login in to application')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('vasya')
			cy.get('#password').type('hardpassword')
			cy.get('#login-button').click()

			cy.contains('Vasiliy logged-in')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('vasya')
			cy.get('#password').type('wrongpassword')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Wrong credentials')
				.and('have.css', 'border-color', 'rgb(255, 0, 0)')
		})
	})
})