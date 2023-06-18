import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../pages/PlantDetails/PlantDetails.css";
import HarvestTracker from "../HarvestTracker/HarvestTracker";

const TaskHistory = ({ plant, token }) => {
  const [plantTasks, setPlantTasks] = useState([]);

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
  }, [plant, token]);

  return (
    <div className="container-fluid">
      <div className="bottom-container">
        <div className="task-info">
          <h3>Plant History:</h3>
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task Type</th>
                <th>Task Completed</th>
              </tr>
            </thead>
            <tbody>
              {plantTasks
                .filter((task) => task.plant_id === plant.id)
                .map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.task_type}</td>
                    <td>{task.task_completed}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;