import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PlantsPage.css";

const PlantsPage = () => {
  const [user, token] = useAuth();
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const gardenIdsResponse = await axios.get("http://localhost:5000/api/user_gardens", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const gardenIds = gardenIdsResponse.data.map((garden) => garden.garden_id);

        const plantResponse = await axios.get("http://localhost:5000/api/plants", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            garden_ids: gardenIds.join(","),
          },
        });
        const plantData = plantResponse.data;

        setPlants(plantData);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchPlants();
  }, [token]);
  
  return (
    <div className="container">
      <h1 className="welcome-message">All Plants</h1>
      <div className="bottom-container">
        {plants.map((plant) => (
          <div
            className={`plant-card ${plant.average_harvest_rating <= 2 ? "red-background" : ""}`}
            key={plant.id}
          >
            <Link to={`/plant-details/${plant.id}`}>
              <div>{plant.type}</div>
              <div>{plant.location}</div>
              {plant.image_url && (
                <img
                  src={`http://localhost:5000/static/images/${plant.image_url}`}
                  alt="Plant Image"
                  className="plant-picture"
                />
              )}
              <div>Garden ID: {plant.garden_id}</div>
              <div>Average Harvest Rating: {plant.average_harvest_rating}</div>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/add-plant">
        <p>Add a New Plant!!</p>
      </Link>
    </div>
  );
};

export default PlantsPage;