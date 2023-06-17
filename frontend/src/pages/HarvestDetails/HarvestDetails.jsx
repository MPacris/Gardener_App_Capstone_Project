import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditHarvestDetails from "../../utils/EditHarvestDetails/EditHarvestDetails";
import UploadHarvestImage from "../../utils/UploadHarvestImage/UploadHarvestImage";
import "./HarvestDetails.css";

const HarvestDetails = () => {
  const { harvest_id } = useParams();
  const [harvest, setHarvest] = useState(null);
  const [task, setTask] = useState(null);
  const [plantType, setPlantType] = useState(null); // New state for plant type
  const [user, token] = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      const plantResponse = await axios.get(
        `http://localhost:5000/api/plants/${taskResponse.data.plant_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setHarvest(harvestResponse.data);
      setTask(taskResponse.data);
      setPlantType(plantResponse.data.type); // Set the plant type

      return Promise.resolve();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Harvest not found");
      } else {
        setError("Error fetching harvest details");
      }
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchHarvestDetails();
  }, [harvest_id, token]);

  const handleSave = (data) => {
    setHarvest((prevHarvest) => ({
      ...prevHarvest,
      rating: data.rating,
      notes: data.notes,
    }));
  };

  const handleImageUpload = () => {
    navigate("/harvests");
  };

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

      <EditHarvestDetails
        harvest={harvest}
        token={token}
        handleSave={handleSave}
      />

      <UploadHarvestImage
        harvest={harvest}
        token={token}
        onImageUpload={handleImageUpload}
      />

      <h3>Task Information:</h3>
      <h2>Plant ID: {task.plant_id}</h2>
      <h2>Plant Type: {plantType}</h2> 

      <h2>Task Scheduled: {task.task_scheduled}</h2>
      <h2>Task Completed: {task.task_completed}</h2>
      <h2>Assigned User: {task.user_id}</h2>

      <div className="image-container">
        {harvest.image_url ? (
          <img
            className="harvest-image"
            src={`http://127.0.0.1:5000/static/images/${harvest.image_url}`}
            alt="Harvest Image"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
    </div>
  );
};

export default HarvestDetails;