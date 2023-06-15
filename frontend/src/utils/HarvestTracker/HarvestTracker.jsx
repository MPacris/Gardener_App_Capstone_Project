import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import axios from "axios";

const HarvestTracker = ({ plantId, token }) => {
  const [harvests, setHarvests] = useState([]);

  const fetchHarvests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/harvests?plant_id=${plantId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setHarvests(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchHarvests();
  }, [plantId, token]);

  const chartData = [["Date", "Rating"], ...harvests.map((harvest) => [harvest.date, harvest.rating])];

  return (
    <Chart
      chartType="LineChart"
      data={chartData}
      width="100%"
      height="400px"
      options={{ legend: { position: 'bottom' } }}
      legendToggle
    />
  );
};

export default HarvestTracker;