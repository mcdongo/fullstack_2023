import { useQuery } from "@apollo/client"
import { GET_FAVORITE_GENRE } from "../utils/queries"
import RecommendedBookList from "./RecommendedBookList"

const RecommendedBooks = ({ show }) => {
  const result = useQuery(GET_FAVORITE_GENRE)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const favoriteGenre = result.data.me.favoriteGenre


  return (
    <div>
      <h1>Recommendations</h1>
      books in your favorite genre <b>{favoriteGenre}</b>
      <RecommendedBookList favoriteGenre={favoriteGenre} />
    </div>
  )
}

export default RecommendedBooks