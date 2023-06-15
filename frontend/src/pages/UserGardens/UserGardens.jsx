import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

function UserGardens() {
  const [gardens, setGardens] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    fetchUserGardens();
  }, []);

  const fetchUserGardens = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/user_gardens', {
        headers: {
            Authorization: "Bearer " + token,
          },
        });
      setGardens(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error case
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

      <Link to="/add-user-garden">
        <p>Go Add User Garden</p>
      </Link>

    

    </div>
  );
}

export default UserGardens;