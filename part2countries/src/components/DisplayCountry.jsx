import { useEffect, useState } from "react";
import axios from "axios";
import { loadEnvConfig } from 'process-env';



export const DisplayCountry = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${import.meta.env.VITE_WEATHER_KEY}`)
            .then((response) => {
                setWeather(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, [country.capital]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="flag" width="100px" />
            <h2>Weather in {country.capital[0]}</h2>
            {weather ? (
                <div>
                    <p>temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
                    <p>wind: {weather.wind.speed} m/s</p>
                </div>
            ) : error ? (
                <p>Could not fetch weather data</p>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};