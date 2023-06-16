import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const PlantHistory = ({ plant, token }) => {
  const [plantTasks, setPlantTasks] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [harvestRatings, setHarvestRatings] = useState([]);

  const fetchPlantTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks?plant_id=${plant.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setPlantTasks(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const fetchHarvestRatings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/harvests?plant_id=${plant.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const ratings = response.data
        .filter((harvest) => harvest.plant_id === plant.id)
        .map((harvest) => [new Date(harvest.task_completed), harvest.rating]);

      setHarvestRatings(ratings);

      if (ratings.length > 0) {
        const sum = ratings.reduce((a, b) => a + b[1], 0);
        const averageRating = sum / ratings.length;
        setAverageRating(averageRating.toFixed(2));
      } else {
        setAverageRating("No Harvests");
      }
    } catch (error) {
      setAverageRating("Error calculating average rating");
    }
  };

  useEffect(() => {
    fetchPlantTasks();
    fetchHarvestRatings();
  }, [plant, token]);

  return (
    <div>
      <h3>Plant History:</h3>
      {plantTasks
        .filter((task) => task.plant_id === plant.id)
        .map((task) => (
          <div key={task.id}>
            <p>Task ID: {task.id}</p>
            <p>Task Type: {task.task_type}</p>
            <p>Task Completed: {task.task_completed}</p>
          </div>
        ))}
      {harvestRatings.length > 0 ? (
        <Chart
          chartType="ScatterChart"
          data={[["Date", "Rating"], ...harvestRatings]}
          width="100%"
          height="400px"
          options={{
            legend: { position: "bottom" },
            curveType: "none",
          }}
          legendToggle
        />
      ) : (
        <p>No harvest ratings found.</p>
      )}
      <p>Average Rating: {averageRating}</p>
    </div>
  );
};

export default PlantHistory;