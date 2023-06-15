import React, { useEffect, useState } from "react";
import axios from "axios";

const PlantHistory = ({ plant, token }) => {
  const [plantTasks, setPlantTasks] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

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

  useEffect(() => {
    fetchPlantTasks();
    calculateAverageRating();
  }, [plant, token]);

  const calculateAverageRating = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/harvests?plant_id=${plant.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const ratings = response.data.map((harvest) => harvest.rating);

      if (ratings.length > 0) {
        const sum = ratings.reduce((a, b) => a + b, 0);
        const averageRating = sum / ratings.length;
        setAverageRating(averageRating.toFixed(2));
      } else {
        setAverageRating("No Harvests");
      }
    } catch (error) {
      setAverageRating("Error calculating average rating");
    }
  };

  return (
    <div>
      <h3>Plant History:</h3>
      {plantTasks
        .filter((task) => task.plant.id === plant.id)
        .map((task) => (
          <div key={task.id}>
            <p>Task ID: {task.id}</p>
            <p>Task Type: {task.task_type}</p>
            <p>Task Completed: {task.task_completed}</p>
          </div>
        ))}
      <p>Average Rating: {averageRating}</p>
    </div>
  );
};

export default PlantHistory;