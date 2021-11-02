/* eslint-disable linebreak-style */
Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3001/api/login', { username, password })
		.then(({ body }) => {
			localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
			cy.visit('http://localhost:3000')
		})
})

Cypress.Commands.add('createBlog', (blog) => {
	const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token
	cy.request({
		url:'http://localhost:3001/api/blogs',
		method: 'POST',
		body: blog,
		headers: {
			Authorization: `bearer ${token}`
		}
	})
	cy.visit('http://localhost:3000')
})