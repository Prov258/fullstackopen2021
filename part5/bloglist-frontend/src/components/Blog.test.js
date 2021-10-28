import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
	title: 'Component testing is done with react-testing-library',
	author: 'fsopen2021',
	url: 'https://fullstackopen2021',
	likes: 4,
	user: {
		name: 'fs',
		username: 'fsopen'
	}
}

const user = {
	name: 'fs',
	username: 'fsopen'
}

test('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
	const component = render(
		<Blog blog={blog} />
	)

	const blogHeader = component.container.querySelector('.blogs__item-header')

	expect(blogHeader).toHaveTextContent(`${blog.title} ${blog.author}`)
	expect(component.container).not.toHaveTextContent(blog.url)
	expect(component.container).not.toHaveTextContent(`likes ${blog.likes}`)
})

test('blog\'s url and number of likes are shown when the button has been clicked', () => {
	const component = render(
		<Blog blog={blog} user={user} />
	)
	const button = component.getByText('view')
	fireEvent.click(button)
	const blogInfo = component.container.querySelector('.blogs__item-info')

	expect(blogInfo).toHaveTextContent(blog.url)
	expect(blogInfo).toHaveTextContent(`likes ${blog.likes}`)
})