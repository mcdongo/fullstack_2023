const ShowCountries = ({filteredCountries}) => {
    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        console.log(country)
        return (
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <b>languages:</b>
                <ul>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name}`}/>
            </div>
        )
    }
    return (
        <div>
        {filteredCountries.length < 11 ?
            filteredCountries.map(country => <p key={country.name}>{country.name}</p>)
            : 'Too many matches, specify another filter'
          }
        </div>
    )
}

export default ShowCountries