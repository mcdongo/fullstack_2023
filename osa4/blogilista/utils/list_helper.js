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

module.exports = {
  dummy,
  getTotalLikes,
  favoriteBlog
}