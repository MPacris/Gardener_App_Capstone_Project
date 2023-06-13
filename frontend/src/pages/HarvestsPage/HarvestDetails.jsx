import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const HarvestDetails = () => {
  const { harvest_id } = useParams();
  const [harvest, setHarvest] = useState(null);
  const [user, token] = useAuth();
  const [editedHarvest, setEditedHarvest] = useState(null);

  const fetchHarvestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/harvests/${harvest_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setHarvest(response.data);
      setEditedHarvest(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    setEditedHarvest({
      ...editedHarvest,
      [e.target.name]: e.target.value,
    });
  };

  const saveHarvestChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/harvests/${harvest_id}`,
        editedHarvest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setHarvest(editedHarvest);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchHarvestDetails();
  }, [harvest_id, token]);

  if (!harvest) {
    return <p>Harvest not found</p>;
  }

  return (
    <div>
      <h3>Harvest Information:</h3>
      <h2>Harvest ID: {harvest.id}</h2>
      <h2>Task ID: {harvest.task_id}</h2>
      <h2>Rating: {harvest.rating}</h2>
      <h2>Image URL: {harvest.image_url}</h2>
      <h2>Notes: {harvest.notes}</h2>
      
      {user.id === harvest.user_id && (
        <div>
          <h3>Edit Harvest:</h3>
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={editedHarvest.rating}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={editedHarvest.image_url}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={editedHarvest.notes}
            onChange={handleInputChange}
          />
          <button onClick={saveHarvestChanges}>Save Changes</button>
        </div>
      )}

<       Link to="/create-harvest">
        <p>Add a New Harvest!!</p>
        </Link>


    </div>
  );
};

export default HarvestDetails;