import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

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

test('if the like button is clicked twice, the event handler is called twice', () => {
	const mockHandler = jest.fn()
	const component = render(
		<Blog blog={blog} user={user} updateLikes={mockHandler} />
	)

	const button = component.getByText('view')
	fireEvent.click(button)

	const buttonLike = component.container.querySelector('.blogs__item-like-btn')
	fireEvent.click(buttonLike)
	fireEvent.click(buttonLike)

	expect(mockHandler.mock.calls).toHaveLength(2)
})

test('form calls the event handler with the right details when a new blog is created', () => {
	const mockHandler = jest.fn()
	const component = render(
		<BlogForm addBlog={mockHandler} />
	)
	const title = component.container.querySelector('#title')
	const author = component.container.querySelector('#author')
	const url = component.container.querySelector('#url')
	const form = component.container.querySelector('form')

	fireEvent.change(title, {
		target: { value: blog.title }
	})
	fireEvent.change(author, {
		target: { value: blog.author }
	})
	fireEvent.change(url, {
		target: { value: blog.url }
	})
	fireEvent.submit(form)

	expect(mockHandler.mock.calls).toHaveLength(1)
	expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
	expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
	expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
})