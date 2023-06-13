import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const CreateHarvest = () => {
  const [user, token] = useAuth();
  const [harvestData, setHarvestData] = useState({
    rating: "",
    image_url: "",
    notes: "",
    task_id: "",
  });

  const handleInputChange = (e) => {
    setHarvestData({
      ...harvestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/harvests", harvestData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <h1>Create Harvest</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={harvestData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={harvestData.image_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={harvestData.notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Task ID:</label>
          <input
            type="number"
            name="task_id"
            value={harvestData.task_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Harvest</button>
        <Link to="/harvests">Back to Harvests Page</Link>
      </form>
    </div>
  );
};

export default CreateHarvest;