import React, { useState } from "react";
import axios from "axios";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState({
    forecast: null,
    history: null
  });
  const [zipCode, setZipCode] = useState("70001");
  const [forecastDays, setForecastDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForecastSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=b0d479a899cd4890add183140231506&q=${zipCode}&days=${forecastDays}`;

    try {
      const response = await axios.get(forecastUrl);
      setWeatherData({ ...weatherData, forecast: response.data });
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }

    setIsLoading(false);
  };

  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const historyUrl = `http://api.weatherapi.com/v1/history.json?key=b0d479a899cd4890add183140231506&q=${zipCode}&dt=${startDate}&end_dt=${endDate}`;

    try {
      const response = await axios.get(historyUrl);
      setWeatherData({ ...weatherData, history: response.data });
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }

    setIsLoading(false);
  };

  const forecastDaysData = weatherData.forecast?.forecast?.forecastday || [];
  const historyDaysData = weatherData.history?.forecast?.forecastday || [];

  return (
    <div>
      <form onSubmit={handleForecastSubmit}>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <label htmlFor="forecastDays">Forecast Days:</label>
        <input
          type="text"
          id="forecastDays"
          value={forecastDays}
          onChange={(e) => setForecastDays(e.target.value)}
        />

        <button type="submit">Get Forecast</button>
      </form>

      <form onSubmit={handleHistorySubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type="submit">Get Historical Data</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="data-container">
          <div className="forecast-container">
            <h2>Forecast</h2>
            {forecastDaysData.map((day, index) => (
              <div key={index}>
                <h3>{day.date}</h3>
                <p>Chance of Rain: {day.day?.daily_chance_of_rain}%</p>
                <p>Temperature Max: {day.day?.maxtemp_f}°F</p>
                <p>Temperature Min: {day.day?.mintemp_f}°F</p>
                <p>UV: {day.day?.uv}</p>
              </div>
            ))}
          </div>

          <div className="history-container">
            <h2>Historical Data</h2>
            {historyDaysData.map((day, index) => (
              <div key={index}>
                <h3>{day.date}</h3>
                <p>Chance of Rain: {day.day?.daily_chance_of_rain}%</p>
                <p>Temperature Max: {day.day?.maxtemp_f}°F</p>
                <p>Temperature Min: {day.day?.mintemp_f}°F</p>
                <p>UV: {day.day?.uv}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;