import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE } from "../utils/queries"

const RecommendedBookList = ({ favoriteGenre }) => {
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre }
  })

  if (result.loading) {
    return <div>loading books...</div>
  }

  const books = result.data.allBooks
  console.log(books)

  return (
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
  )
}

export default RecommendedBookList