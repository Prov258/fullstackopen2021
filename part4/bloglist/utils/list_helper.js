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

const mostBlogs = (blogs) => {
    const blogsAuthors = blogs.map(item => item.author)
    const authorsWithQuantity = {}
    blogsAuthors.forEach(item => {
        if(authorsWithQuantity.hasOwnProperty(item)){
            authorsWithQuantity[item] += 1; 
        } else{
            authorsWithQuantity[item] = 1;
        }
    })
    const maxValue = Math.max(...Object.values(authorsWithQuantity))
    const maxKey = Object.keys(authorsWithQuantity).find(key => authorsWithQuantity[key] === maxValue)

    return {
        author: maxKey,
        blogs: maxValue
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}