const Country = ({country}) => {
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

export default Country