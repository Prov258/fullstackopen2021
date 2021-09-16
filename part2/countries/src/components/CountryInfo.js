import React from "react";

const CountryInfo = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <div>capital {props.capital}</div>
            <div>population {props.population}</div>
            <h3>languages</h3>
            <ul>
                {props.languages.map(l => <li key={l.name} >{l.name}</li>)}
            </ul>
            <img style={{width: "150px", maxWidth: "100%"}} src={props.flag} alt={`${props.name} flag`} />
        </div>
    )
}

export default CountryInfo;