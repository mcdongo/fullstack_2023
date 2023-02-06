import { useState, useEffect } from "react";
import axios from 'axios'
import ShowCountries from './components/ShowCountries'
const baseUrl = 'https://restcountries.com/v2/all'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const getAll = () => {
    axios
      .get(baseUrl)
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(getAll, [])

  const handleChange = (event) => {
    setNewFilter(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.includes(filter)))
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      <div>
        <ShowCountries filteredCountries={filteredCountries} />
      </div>
    </div>
  )
}
export default App;
