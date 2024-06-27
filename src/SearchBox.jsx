
import "./SearchBox.css";
import { useState } from 'react';
import axios from 'axios';

export default function SearchBox() {
    let [city, setCity] = useState("");
    let [weather, setWeather] = useState(null);
    let [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        const options = {
            method: 'GET',
            url: 'https://yahoo-weather5.p.rapidapi.com/weather',
            params: {
                location: city,
                format: 'json',
                u: 'f'
            },
            headers: {
                'x-rapidapi-key': '0adb62de54msh938e6232f4bdbafp1f2da1jsn2c8e512017a4',
                'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeather(null);
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        fetchWeather(city);
        setCity("");
    };

    return (
        <div className="SearchBox">
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
                <input
                    id="city"
                    label="City Name"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br></br>
                <br></br>
                <button type="submit">Search</button>
            </form>
            {error && <div>Error: {error}</div>}
            {
                weather && (
                    <div>
                        <h1>Weather in {weather.location.city}</h1>
                        <p>Temperature: {weather.current_observation.condition.temperature} °F</p>
                        <p>Condition: {weather.current_observation.condition.text}</p>
                        <p>Humidity: {weather.current_observation.atmosphere.humidity} %</p>
                        <p>Wind Speed: {weather.current_observation.wind.speed} mph</p>
                    </div>
                )
            }
        </div >
    );
}
