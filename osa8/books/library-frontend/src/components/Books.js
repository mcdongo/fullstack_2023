import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../utils/queries"

const Books = (props) => {
  const [chosenGenre, setChosenGenre] = useState('all')
  const [genreList, setGenreList] = useState([])

  const queryToUse = chosenGenre === 'all' ? ALL_BOOKS : BOOKS_BY_GENRE

  const result = useQuery(queryToUse, {
    variables: chosenGenre !== 'all' ? { genre: chosenGenre } : {},
    pollInterval: 2000
  })

  useEffect(() => {
    if (result.data && chosenGenre === 'all') {
      const uniqueGenreSet = new Set()
      const tempBookList = result.data.allBooks

      tempBookList.forEach((book) => {
        book.genres.forEach((genre) => uniqueGenreSet.add(genre))
      })
      setGenreList(Array.from(uniqueGenreSet))
    }
  }, [result.data]) //eslint-disable-line


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreList.map((genre) => (
          <button key={genre} onClick={() => setChosenGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setChosenGenre('all')}>all genres</button>
    </div>
  )
}

export default Books
