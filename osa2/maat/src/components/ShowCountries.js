import Country from './Country'

const ShowCountries = ({filteredCountries}) => {
    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
            <div>
                <Country country={country} />
            </div>
        )
    }

    return (
        <div>
        {filteredCountries.length < 11 
        ? filteredCountries.map(country =>
                <p key={country.name}>
                    {country.name}
                </p>
                )
            : 'Too many matches, specify another filter'
          }
        </div>
    )
}

export default ShowCountries