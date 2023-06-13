import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const defaultValues = {
  rating: "",
  image_url: "",
  notes: "",
  task_id: "",
}


const CreateHarvest = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const taskIdFromQuery = searchParams.get("task_id");
    setFormData((prevData) => ({
      ...prevData,
      task_id: taskIdFromQuery,
    }));
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function postNewHarvest() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/harvests",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setFormData(defaultValues);
      navigate("/harvests");
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewHarvest();
  };


  return (
    <div className="container">
      <h1>Create Harvest</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label element="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />

        <label element="image_url">Harvest Image:</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleInputChange}
        />
        <label element="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />

        <label element="task_id">Task ID:</label>
        <input
          type="number"
          id="task_id"
          name="task_id"
          value={formData.task_id}
          onChange={handleInputChange}
        />
        <button type="submit">Create Harvest</button>
        

      </form>
    </div>
  );
};

export default CreateHarvest;