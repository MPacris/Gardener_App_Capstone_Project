import React, { useState } from "react";
import axios from "axios";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [zipCode, setZipCode] = useState("70001");
  const [forecastDays, setForecastDays] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=b0d479a899cd4890add183140231506&q=${zipCode}&days=${forecastDays}`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setIsLoading(false);
  };

  const days = weatherData?.forecast?.forecastday || [];

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        days.map((day, index) => (
          <div key={index}>
            <h3>{day.date}</h3>
            <p>Chance of Rain: {day.day?.daily_chance_of_rain}%</p>
            <p>Temperature Max: {day.day?.maxtemp_f}°F</p>
            <p>Temperature Min: {day.day?.mintemp_f}°F</p>
            <p>UV: {day.day?.uv}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default WeatherPage;