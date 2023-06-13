import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
    } catch (error) {}
  };

  useEffect(() => {
    fetchPlantDetails();
  }, [plant_id, token]);

  if (!plant) {
    return <p>Plant not found</p>;
  }

  return (
    <div>
      <h3>Plant Information:</h3>
      <h2>{plant.type}</h2>
      <h2>{plant.location}</h2>
      <h2>{plant.image_url}</h2>
      <h2>{plant.garden_id}</h2>

      <Link to={`/create-task?plant_id=${plant_id}`}>
        <p>Create Task</p>
      </Link>
    </div>
  );
};

export default PlantDetails;