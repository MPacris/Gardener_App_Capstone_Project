import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const HarvestDetails = () => {
  const { harvest_id } = useParams();
  const [harvest, setHarvest] = useState(null);
  const [task, setTask] = useState(null);
  const [user, token] = useAuth();
  const [error, setError] = useState(null);

  const fetchHarvestDetails = async () => {
    try {
      const harvestResponse = await axios.get(
        `http://localhost:5000/api/harvests/${harvest_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const taskResponse = await axios.get(
        `http://localhost:5000/api/tasks/${harvestResponse.data.task_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setHarvest(harvestResponse.data);
      setTask(taskResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Harvest not found");
      } else {
        setError("Error fetching harvest details");
      }
    }
  };

  useEffect(() => {
    fetchHarvestDetails();
  }, [harvest_id, token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!harvest || !task) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Harvest Information:</h3>
      <h2>Harvest ID: {harvest.id}</h2>
      <h2>Task ID: {harvest.task_id}</h2>
      <h2>Rating: {harvest.rating}</h2>
      <h2>Image URL: {harvest.image_url}</h2>
      <h2>Notes: {harvest.notes}</h2>
      <h3>Task Information:</h3>
      <h2>Task Type: {task.task_type}</h2>
      <h2>Start Date: {task.task_scheduled}</h2>
      <h2>End Date: {task.task_completed}</h2>
      <h2>Assigned User: {task.user_id}</h2>
    </div>
  );
};

export default HarvestDetails;