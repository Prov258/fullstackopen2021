import React from "react";

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map(l => <li key={l.name} >{l.name}</li>)}
            </ul>
            <img style={{width: "150px", maxWidth: "100%"}} src={country.flag} alt={`${country.name} flag`} />
        </div>
    )
}

export default CountryInfo;