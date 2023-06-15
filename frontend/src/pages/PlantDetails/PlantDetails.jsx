import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditPlantDetails from "../../utils/EditPlantDetails/EditPlantDetails";
import UploadPlantImage from "../../utils/UploadPlantImage/UploadPlantImage";
import "./PlantDetails.css";
import PlantHistory from "../../utils/PlantHistory/PlantHistory";
import HarvestTracker from "../../utils/HarvestTracker/HarvestTracker";

const PlantDetails = () => {
  const { plant_id } = useParams();
  const [plant, setPlant] = useState(null);
  const [user, token] = useAuth();

  const fetchPlantDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/plants/${plant_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setPlant(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchPlantDetails();
  }, [plant_id, token]);

  const handleSave = (data) => {
    setPlant((prevPlant) => ({
      ...prevPlant,
      type: data.type,
      location: data.location,
    }));
  };

  const handleImageUpload = () => {
    fetchPlantDetails();
  };

  if (!plant) {
    return <p>Plant not found</p>;
  }

  return (
    <div>
      <h3>Plant Information:</h3>
      {plant && (
        <div>
          <div>PLANT ID: {plant_id}</div>

          <EditPlantDetails
            plant={plant}
            token={token}
            handleSave={handleSave}
          />

          <UploadPlantImage
            plant={plant}
            token={token}
            handleImageUpload={handleImageUpload}
          />

          <PlantHistory plant={plant} token={token} />

          <div className="image-container">
            <img
              className="plant-image"
              src={`http://127.0.0.1:5000/static/images/${plant.image_url}`}
              />
          </div>

          <HarvestTracker plantId={plant} token={token} />

        </div>
      )}

      <div>
        <Link to="/plants">Back to Plants</Link>
        <Link to={`/create-task?plant_id=${plant_id}`}>Create task</Link>
      </div>
    </div>
  );
};

export default PlantDetails;
