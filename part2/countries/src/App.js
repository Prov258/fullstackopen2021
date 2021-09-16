import React, { useEffect, useState } from "react";
import axios from 'axios'
import CountryInfo from "./components/CountryInfo";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([])
  const [findValue, setFindValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [activeCountries, setActiveCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.status);
        setCountries(response.data);
      })
  }, [])

  const filterChangeHandler = (e) => {
    setFindValue(e.target.value)
    setFilteredCountries(countries.filter(c => c.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  function showCountriesHandler(){
    return activeCountries.includes(this)
      ? setActiveCountries(activeCountries.filter(country => country !== this))
      : setActiveCountries(activeCountries.concat(this))
  }

  return (
    <div>
      <div>
        <span>find countries </span>
        <input value={findValue} onChange={filterChangeHandler} />
      </div>
      <div>
        {
          filteredCountries.length === 1
            ? <CountryInfo country={filteredCountries[0]} />
            : filteredCountries.length <= 10
              ? filteredCountries.map(c =>
                  <Country 
                    key={c.name} 
                    country={c} 
                    onCountryClick={showCountriesHandler.bind(c.name)} 
                    activeCountries={activeCountries} 
                  />
                )
              : "Too many matches, specify another filter"
        }
      </div>
    </div>
  );
}

export default App;
