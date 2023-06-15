import React, { useState } from "react";
import axios from "axios";

const EditHarvestDetails = ({ harvest, token, handleSave }) => {
  const [newRating, setNewRating] = useState(harvest.rating);
  const [newNotes, setNewNotes] = useState(harvest.notes);

  const handleRatingChange = (e) => {
    setNewRating(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNewNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        rating: newRating,
        notes: newNotes,
      };

      await axios.put(`http://localhost:5000/api/harvests/${harvest.id}`, data, {
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
        Rating:
        <input type="text" value={newRating} onChange={handleRatingChange} />
      </label>
      <label>
        Notes:
        <input type="text" value={newNotes} onChange={handleNotesChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditHarvestDetails;