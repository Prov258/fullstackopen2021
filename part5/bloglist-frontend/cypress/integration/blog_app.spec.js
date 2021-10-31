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
			cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'vasya', password: 'hardpassword' })
		})

		it('A blog can be created', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('cypress is awesome')
			cy.get('#author').type('vasya123')
			cy.get('#url').type('https://www.google.com')
			cy.get('#create-blog-btn').click()

			cy.get('.error')
				.should('contain', 'a new blog cypress is awesome by vasya123 added')
				.and('have.css', 'border-color', 'rgb(0, 128, 0)')
			cy.contains('cypress is awesome vasya123')
		})

		describe('and a blog exists', function() {
			beforeEach(function() {
				cy.createBlog({ title: 'blog made by cypress', author: 'vasya123', url: 'https://www.google.com' })
			})

			it('user can like a blog', function() {
				cy.contains('blog made by cypress')
					.contains('view')
					.click()
					.parent()
					.parent()
					.find('.blogs__item-like-btn')
					.click()

				cy.contains('blog made by cypress')
					.parent()
					.contains('likes 1')
			})
		})
	})
})