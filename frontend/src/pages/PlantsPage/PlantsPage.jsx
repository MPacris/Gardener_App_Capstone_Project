import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const PlantsPage = () => {
  const [user,token] = useAuth();
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
      <div>
        {plants.map((plant) => (
          <Link to={`/plant-details/${plant.id}`} key={plant.id}>
            <li>
              <h3>Type: {plant.type}</h3>
              <p>Location: {plant.location}</p>
              <p>Image: {plant.image_url} </p>
              <p>Garden ID: {plant.garden_id}</p>
            </li>
          </Link>
        ))}
      </div>

      <Link to="/add-plant">
        <p>Add a New Plant!!</p>
      </Link>



    </div>
  );
};

export default PlantsPage;