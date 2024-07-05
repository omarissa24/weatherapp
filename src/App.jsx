import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import { useTemp } from "./contexts/tempContext";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const { tempDegree, toggleTemp } = useTemp();

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      try {
        setLoading(true);
        const data = await fetchWeather(cityName);
        // add timeout to see loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWeatherData(data);
        setSearchHistory((prev) => [...prev, cityName]);
        setCityName("");
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const fetchFromHistory = async (city) => {
    try {
      setLoading(true);
      const data = await fetchWeather(city);
      setWeatherData(data);
      setCityName("");
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Enter city name...'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      <button style={{ marginLeft: "20px" }} onClick={() => toggleTemp()}>
        Toggle Temperature
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {weatherData && (
        <div>
          <h2>
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          <p>
            Temperature:{" "}
            {tempDegree === "C"
              ? weatherData.current.temp_c
              : weatherData.current.temp_f}{" "}
            °{tempDegree}
          </p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>Humidity: {weatherData.current.humidity} %</p>
          <p>Pressure: {weatherData.current.pressure_mb} mb</p>
          <p>Visibility: {weatherData.current.vis_km} km</p>
        </div>
      )}

      {searchHistory.length !== 0 && (
        <>
          <h3>Search History</h3>
          <ul>
            {searchHistory.map((city, index) => (
              <li
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => fetchFromHistory(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
