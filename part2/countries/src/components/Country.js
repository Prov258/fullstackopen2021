import React from "react";
import CountryInfo from "./CountryInfo";

const Country = ({ country, onCountryClick, activeCountries }) => {
    return (
        <div>
            <span>{country.name} </span>
            <button onClick={onCountryClick}>show</button>
            {activeCountries.includes(country.name) 
                ? <CountryInfo country={country} />
                : null
            }
        </div>
    )
}

export default Country;