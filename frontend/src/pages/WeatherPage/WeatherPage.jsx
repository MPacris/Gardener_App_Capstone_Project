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
    <div className="container">
      <form onSubmit={handleForecastSubmit} className="mb-3">
        <div className="form-row">
          <div className="col-auto">
            <label htmlFor="zipCode" className="sr-only">
              Zip Code:
            </label>
            <input
              type="text"
              id="zipCode"
              className="form-control"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <label htmlFor="forecastDays" className="sr-only">
              Forecast Days:
            </label>
            <input
              type="text"
              id="forecastDays"
              className="form-control"
              value={forecastDays}
              onChange={(e) => setForecastDays(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Get Forecast
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleHistorySubmit} className="mb-3">
        <div className="form-row">
          <div className="col-auto">
            <label htmlFor="startDate" className="sr-only">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <label htmlFor="endDate" className="sr-only">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Get Historical Data
            </button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Forecast</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {forecastDaysData.map((day, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card mb-3">
                        <div className="card-header">{day.date}</div>
                        <div className="card-body">
                          <p className="card-text">
                            Chance of Rain: {day.day?.daily_chance_of_rain}%
                          </p>
                          <p className="card-text">
                            Temperature Max: {day.day?.maxtemp_f}°F
                          </p>
                          <p className="card-text">
                            Temperature Min: {day.day?.mintemp_f}°F
                          </p>
                          <p className="card-text">UV: {day.day?.uv}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Historical Data</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {historyDaysData.map((day, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card mb-3">
                        <div className="card-header">{day.date}</div>
                        <div className="card-body">
                          <p className="card-text">
                            Chance of Rain: {day.day?.daily_chance_of_rain}%
                          </p>
                          <p className="card-text">
                            Temperature Max: {day.day?.maxtemp_f}°F
                          </p>
                          <p className="card-text">
                            Temperature Min: {day.day?.mintemp_f}°F
                          </p>
                          <p className="card-text">UV: {day.day?.uv}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;