const dummy = blogs => {
  return 1
}

const getTotalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = array => {
  const reducer = (previous, current) => {
    return previous.likes > current.likes
      ? previous
      : current
  }
  const withMostLikes = array.reduce(reducer, 0)
  if (withMostLikes) {
    return (
      {
        title: withMostLikes.title,
        author: withMostLikes.author,
        likes: withMostLikes.likes
      }
    )}
  return null
}

const mostBlogs = array => {
  let bloggers = []
  let maxAuthor = ''
  let maxBlogs = 0

  array.forEach(blog => {
    if (!(blog.author in bloggers)) {
      bloggers[blog.author] = 0
    }
    bloggers[blog.author] += 1

    if (bloggers[blog.author] > maxBlogs) {
      maxAuthor = blog.author
      maxBlogs = bloggers[blog.author]
    }
  })

  return maxBlogs !== 0
    ? { author: maxAuthor, blogs: maxBlogs }
    : null
}

const mostLikes = array => {
  let bloggers = []
  let maxAuthor = ''
  let maxLikes = 0

  array.forEach(blog => {
    if (!(blog.author in bloggers)) {
      bloggers[blog.author] = 0
    }
    bloggers[blog.author] += blog.likes

    if (bloggers[blog.author] > maxLikes) {
      maxAuthor = blog.author
      maxLikes = bloggers[blog.author]
    }
  })

  return maxLikes !== 0
    ? { author: maxAuthor, likes: maxLikes }
    : null
}

module.exports = {
  dummy,
  getTotalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}