import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const defaultValues = {
  type: "",
  location: "",
};

const GardenDetails = () => {
  const { garden_id } = useParams();
  const [garden, setGarden] = useState(null);
  const [plants, setPlants] = useState([]);
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(defaultValues);

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

  const filteredPlants = plants.filter(
    (plant) => plant.garden_id === parseInt(garden_id)
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/plants",
        {
          ...formData,
          garden_id: parseInt(garden_id),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setFormData(defaultValues);
      navigate("/plants");
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h2>{garden.name}</h2>
      <p>{garden.notes}</p>
      <h3>Users:</h3>
      <div>
        {garden.users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </div>
      <h3>Plants:</h3>
      <div>
        {filteredPlants.map((plant) => (
          <Link to={`/plant-details/${plant.id}`} key={plant.id}>
            <li>
              {plant.type} {plant.location} {plant.image_url}
            </li>
          </Link>
        ))}
      </div>

      <div className="container">
        <h3>Add Plant</h3>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />

          <button type="submit">Add plant</button>
        </form>
        <Link to="/gardens">Go to Gardens Page</Link>
      </div>
    </div>
  );
};

export default GardenDetails;