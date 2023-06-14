import React, { useState } from "react";
import axios from "axios";

const EditPlantDetails = ({ plant, token, handleSave }) => {
  const [newType, setNewType] = useState(plant.type);
  const [newLocation, setNewLocation] = useState(plant.location);

  const handleTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        type: newType,
        location: newLocation,
      };

      await axios.put(`http://localhost:5000/api/plants/${plant.id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      handleSave(data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input type="text" value={newType} onChange={handleTypeChange} />
      </label>
      <label>
        Location:
        <input type="text" value={newLocation} onChange={handleLocationChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPlantDetails;