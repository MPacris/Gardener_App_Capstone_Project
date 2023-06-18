import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditPlantDetails from "../../utils/EditPlantDetails/EditPlantDetails";
import UploadPlantImage from "../../utils/UploadPlantImage/UploadPlantImage";
import TaskHistory from "./../../utils/TaskHistory/TaskHistory";
import HarvestTracker from "../../utils/HarvestTracker/HarvestTracker";

const PlantDetails = () => {
  const { plant_id } = useParams();
  const [plant, setPlant] = useState(null);
  const [user, token] = useAuth();
  const navigate = useNavigate();

  const fetchPlantDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/plants/${plant_id}?include_type=true`,
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <div className="plant-information">
            <h5>Plant Information:</h5>
            <div>
              <div>PLANT ID: {plant_id}</div>
              <div>PLANT Type: {plant.type}</div>

              <div className="edit-upload-container">
                <h5>Edit Plant Details</h5>
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

                <div className="links">
                  <Link to="/plants">Back to Plants</Link>
                  <Link to={`/create-task?plant_id=${plant_id}`}>
                    Create task
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="plant-image-container">
            <img
              className="plant-image"
              src={`http://localhost:5000/static/images/${
                plant.image_url || ""
              }`}
              alt="Plant"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="task-history">
            <TaskHistory plant={plant} token={token} />
          </div>
        </div>

        <div className="col-8">
          <div className="harvest-tracker">
            <HarvestTracker plant={plant} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;