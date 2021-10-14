const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, current) =>  sum + current.likes
    return blogs.reduce(reducer, 0)
}

module.exports = {
    dummy, totalLikes
}