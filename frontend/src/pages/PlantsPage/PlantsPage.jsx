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
        const response = await axios.get("http://localhost:5000/api/plants", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setPlants(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchPlants();
  }, [token]);

  return (
    <div className="container">
      <h1>This is the Plants Page</h1>
      <div className="bottom-container">
        {plants.map((plant) => (
          <div className="plant-card" key={plant.id}>
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