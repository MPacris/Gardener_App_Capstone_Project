import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const GardenDetails = () => {
  const { garden_id } = useParams();
  const [garden, setGarden] = useState(null);
  const [plants, setPlants] = useState([]);
  const [user, token] = useAuth();
  const navigate = useNavigate()

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
      <div>
      {filteredPlants.map((plant) => (
          <Link to={`/plant-details/${plant.id}`} key={plant.id}>
            <li>{plant.type} {plant.location} {plant.image_url}</li>
          </Link>
        ))}
      </div>
      <Link to="/add-plant">
        <p>Add a New Plant!!</p>
      </Link>


    </div>
  );
};

export default GardenDetails;