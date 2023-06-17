import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditPlantDetails from "../../utils/EditPlantDetails/EditPlantDetails";
import UploadPlantImage from "../../utils/UploadPlantImage/UploadPlantImage";
import "./PlantDetails.css";
import PlantHistory from "../../utils/PlantHistory/PlantHistory";

const PlantDetails = () => {
  const { plant_id } = useParams();
  const [plant, setPlant] = useState(null);
  const [user, token] = useAuth();
  const navigate = useNavigate();

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

  const handleImageUpload = async () => {
    await fetchPlantDetails();
    navigate(`/garden-details/${plant.garden_id}`);
  };

  if (!plant) {
    return <p>Plant not found</p>;
  }

  return (
    <div>
      <h3>Plant Information:</h3>
      <div>
        <div>PLANT ID: {plant_id}</div>

        <div>
        <Link to="/plants">Back to Plants</Link>
        <Link to={`/create-task?plant_id=${plant_id}`}>Create task</Link>
      </div>

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
            src={`http://localhost:5000/static/images/${
              plant.image_url || "" // Check if the image_url is defined before using it
            }`}
            alt="Plant"
          />
        </div>
      </div>


    </div>
  );
};

export default PlantDetails;