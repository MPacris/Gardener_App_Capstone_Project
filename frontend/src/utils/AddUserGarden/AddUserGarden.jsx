import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

function AddUserGarden() {
  const [username, setUsername] = useState('');
  const [gardenId, setGardenId] = useState('');
  const [user, token] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/user_gardens',
        {
          username,
          garden_id: gardenId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
  
      console.log(response.data);
  
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div>
      <h1>Add User Garden</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="gardenId">Garden ID:</label>
        <input
          type="text"
          id="gardenId"
          name="gardenId"
          value={gardenId}
          onChange={(e) => setGardenId(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUserGarden;