import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const defaultValues = {
  name: '',
  notes: ''
};

const AddGarden = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function postNewGarden() {
    try {
      let existingGardens = await axios.get('http://localhost:5000/api/gardens', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      let isDuplicate = existingGardens.data.some((garden) => garden.name === formData.name);
      if (isDuplicate) {
        setError('Garden name must be unique.');
        return;
      }

      let response = await axios.post('http://localhost:5000/api/gardens', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      setFormData(defaultValues);

      navigate('/gardens');
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewGarden();
  };

  return (
    <div className="container">
      <h1>Add Garden</h1>
      {error && <p>{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <label element="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label element="notes">Notes:</label>
        <textarea
          type="text"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />

        <button type="submit">Add Garden</button>
      </form>
      <Link to="/gardens">Go to Gardens Page</Link>
    </div>
  );
};

export default AddGarden;