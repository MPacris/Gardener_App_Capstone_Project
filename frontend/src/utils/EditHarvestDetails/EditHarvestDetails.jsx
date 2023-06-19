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
    <form onSubmit={handleSubmit} className="section bg-light p-3 mb-4">
      <h3 className="mb-3">Edit Harvest Details:</h3>
      <div className="form-group row">
        <label htmlFor="rating" className="col-sm-2 col-form-label">Rating:</label>
        <div className="col-sm-10">
          <input type="text" id="rating" className="form-control" value={newRating} onChange={handleRatingChange} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="notes" className="col-sm-2 col-form-label">Notes:</label>
        <div className="col-sm-10">
          <input type="text" id="notes" className="form-control" value={newNotes} onChange={handleNotesChange} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default EditHarvestDetails;