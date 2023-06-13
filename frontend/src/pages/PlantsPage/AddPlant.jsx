import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const defaultValues = {
  type: '',
  location:'',
  image_url:'',
  garden_id: '',
};

const AddPlant = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function postNewPlant() {
    try {

      const response = await axios.post('http://localhost:5000/api/plants', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      setFormData(defaultValues);

      navigate('/plants');
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewPlant();
  };


  return (
    <div className="container">
      <h1>Add Plant</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label element="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        />
        <label element="name">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />

        <label element="plant_image">Plant Image:</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleInputChange}
        />

        <label element="garden_id">Garden ID:</label>
        <input
          type="number"
          id="garden_id"
          name="garden_id"
          value={formData.garden_id}
          onChange={handleInputChange}
        />


        <button type="submit">Add plant</button>
      </form>
      <Link to="/gardens">Go to Gardens Page</Link>
    </div>
  );
};

export default AddPlant;