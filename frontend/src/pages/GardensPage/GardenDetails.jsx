import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const GardenDetails = () => {
  const { garden_id } = useParams();
  const [garden, setGarden] = useState(null);
  const [plants, setPlants] = useState([]);
  const [user, token] = useAuth();

  const fetchGardenDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/gardens/${garden_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setGarden(response.data);
    } catch (error) {}
  };

  const fetchPlants = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/plants`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPlants(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGardenDetails();
    fetchPlants();
  }, [garden_id, token]);

  if (!garden) {
    return <p>Garden not found</p>;
  }

  // Filter plants based on garden_id
  const filteredPlants = plants.filter((plant) => plant.garden_id === parseInt(garden_id));

  return (
    <div>
      <h2>{garden.name}</h2>
      <p>{garden.notes}</p>
      <h3>Plants:</h3>
      <ul>
        {filteredPlants.map((plant) => (
          <li key={plant.id}>{plant.type} {plant.location} {plant.image_url} </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenDetails;