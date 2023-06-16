import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const HarvestTracker = ({ plantId }) => {
  const [chartData, setChartData] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/harvests?plant_id=${plantId}`,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        const ratings = response.data.map((harvest) => [
          new Date(harvest.task_completed),
          harvest.rating,
        ]);
        setChartData([['Date', 'Rating'], ...ratings]);
      } catch (error) {
        // Handle error
      }
    };

    fetchRatings();
  }, [plantId, token]);

  return (
    <div>
      <h3>Harvest Ratings Chart:</h3>
      {chartData.length > 0 ? (
        <Chart
          chartType="LineChart"
          data={chartData}
          width="100%"
          height="400px"
          options={{ legend: { position: 'bottom' } }}
          legendToggle
        />
      ) : (
        <p>No harvest ratings found.</p>
      )}
    </div>
  );
};

export default HarvestTracker;