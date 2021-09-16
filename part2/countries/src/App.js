import React, { useEffect, useState } from "react";
import axios from 'axios'
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countries, setCountries] = useState([])
  const [findValue, setFindValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

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

  return (
    <div>
      <div>
        <span>find countries </span>
        <input value={findValue} onChange={filterChangeHandler} />
      </div>
      <div>
        {filteredCountries.length === 1
            ? <CountryInfo 
                name={filteredCountries[0].name} 
                capital={filteredCountries[0].capital} 
                population={filteredCountries[0].population} 
                languages={filteredCountries[0].languages} 
                flag={filteredCountries[0].flag} 
              />
            : filteredCountries.length <= 10
              ? filteredCountries.map(c => <div key={c.name}>{c.name}</div>)
              : "Too many matches, specify another filter"}
      </div>
    </div>
  );
}

export default App;
