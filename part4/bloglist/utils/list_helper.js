const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, current) =>  sum + current.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const blogsLikes = blogs.map(item => item.likes)
    return blogs.find(item => item.likes === Math.max(...blogsLikes))
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}