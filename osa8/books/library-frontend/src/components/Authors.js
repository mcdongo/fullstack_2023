import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../utils/queries"

const SetBirthyearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if (!authors) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(name, birthyear)

    editAuthor({ variables: { name, setBornTo: Number(birthyear) }})

    setName('')
    setBirthyear('')
  }

  const handleAuthorChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>
        Set birthyear
      </h2>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={handleAuthorChange}>
          {authors.map(author => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}

        </select>
        <br/>
        birthyear
        <input type='text' value={birthyear} onChange={ ({ target }) => setBirthyear(target.value)} />
        <br/>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
        <SetBirthyearForm authors={authors}/>
      }
    </div>
  )
}

export default Authors
