import React from "react";

const Weather = ({ weather }) => {
    return (
        <>
            {weather ? 
                <div>
                    <div><strong>temperature: </strong>{Math.floor(weather.main.temp)} Celcius</div>
                    <div><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={'weather icon'} /></div>
                    <div><strong>wind: </strong>{Math.floor(weather.wind.speed * 3.6)} km/h {weather.wind.deg} deg</div>
                </div> 
                : <div>Weather is not avaliable now.</div>
            }
        </>
    )
}

export default Weather;