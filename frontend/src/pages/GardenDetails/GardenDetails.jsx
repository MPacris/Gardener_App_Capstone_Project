import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditGardenDetails from "../../utils/EditGardenDetails/EditGardenDetails";
import "./GardenDetails.css";

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
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    let mounted = true;

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
        if (mounted) {
          setGarden(response.data);
        }
      } catch (error) {
        
      }
    };

    const fetchPlants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/plants", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (mounted) {
          setPlants(response.data);
        }
      } catch (error) {
        
      }
    };

    fetchGardenDetails();
    fetchPlants();

    return () => {
      mounted = false;
    };
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

    if (!formData.type || !formData.location) {
      console.log("Type and location are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/plants",
        {
          type: formData.type,
          location: formData.location,
          garden_id: parseInt(garden_id),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setFormData(defaultValues);
      navigate(`/garden-details/${garden_id}`); 
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSave = (data) => {
    setGarden((prevGarden) => ({
      ...prevGarden,
      type: data.type,
      location: data.location,
    }));
    setEditMode(false);
  };

  return (
    <div className="container-fluid">
      <div className="top-container">
        <div className="col-lg-4 col-lg-3">
          <div className="description">
            <h2>{garden.name}</h2>
            <p>{garden.notes}</p>
            {!editMode ? (
            <Link to={`/edit-garden/${garden_id}`}>Edit Garden</Link>
          ) : (
            <Link to="#" onClick={() => setEditMode(false)}>
              Cancel Edit
            </Link>
          )}
          <Link to="/gardens">Go to Gardens Page</Link>
          <div className="container">
            {editMode ? (
              <EditGardenDetails
                garden={garden}
                token={token}
                handleSave={handleSave}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-lg-3">
          <div className="add-plant">
            <h3>Add Plant</h3>

            <form className="form" onSubmit={handleSubmit}>
              <label element="type">Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              />

              <label element="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />

              <button type="submit">Add plant</button>
            </form>
          </div>
        </div>

        <div className="col-lg-4 col-lg-3">
          <div className="users">
            <h3>Users:</h3>
            <div>
              {garden.users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="bottom-container">
          {filteredPlants.map((plant) => (
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GardenDetails;
