import axios from "axios";
import React, { useEffect, useState } from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState('')
    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${apiKey}`)
            .then(response => {
                setWeather(response.data);
            })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(l => <li key={l.name} >{l.name}</li>)}
            </ul>
            <img style={{width: "150px", maxWidth: "100%"}} src={country.flag} alt={`${country.name} flag`} />
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather} />
        </div>
    )
}

export default CountryInfo;