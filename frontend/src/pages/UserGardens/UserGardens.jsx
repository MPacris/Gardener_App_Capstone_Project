import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function UserGardens() {
  const [gardens, setGardens] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedGarden, setSelectedGarden] = useState('');
  const [user, token] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserGardens();
    fetchUsers();
  }, []);

  const fetchUserGardens = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/user_gardens', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setGardens(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error case
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/users', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error case
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/user_gardens',
        {
          username: selectedUser,
          garden_id: selectedGarden,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log(response.data);
      // Reset selected values
      setSelectedUser('');
      setSelectedGarden('');
      fetchUserGardens(); // Fetch updated user gardens

      // Navigate to /gardens
      navigate('/gardens');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Gardens</h1>
      <ul>
        {gardens.map((garden) => (
          <li key={garden.id}>{garden.name}</li>
        ))}
      </ul>

      <h2>Add User Garden</h2>
      <form onSubmit={handleSubmit}>
        <label element="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        />

        <label element="gardenId">Garden ID:</label>
        <select
          id="gardenId"
          name="gardenId"
          value={selectedGarden}
          onChange={(e) => setSelectedGarden(e.target.value)}
          required
        >
          <option value="">Select a garden</option>
          {gardens.map((garden) => (
            <option key={garden.id} value={garden.id}>
              {garden.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserGardens;