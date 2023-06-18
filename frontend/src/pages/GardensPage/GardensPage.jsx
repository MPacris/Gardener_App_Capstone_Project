import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GardensPage = () => {
  const [user, token] = useAuth();
  const [gardens, setGardens] = useState([]);
  const [username, setUsername] = useState('');
  const [gardenId, setGardenId] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGardens = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gardens", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setGardens(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchGardens();
  }, [token]);

  useEffect(() => {
    if (user) {
      setUsername('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user_gardens",
        {
          username,
          garden_id: gardenId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      setSubmissionStatus('Gardener Added!!!');
      navigate('/gardens');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {user && <h1>Welcome Back, {user.username}</h1>}
      <h3>Your Gardens</h3>
      <div>
        {gardens.map((garden) => (
          <Link to={`/garden-details/${garden.id}`} key={garden.id}>
            <li>{garden.name}</li>
          </Link>
        ))}
      </div>

      <Link to="/add-garden">
        <p>Add a New Garden!!</p>
      </Link>

      {submissionStatus && <p>{submissionStatus}</p>}

      <form onSubmit={handleSubmit}>
        <h2>Add a Gardener to the Current List of Gardens</h2>
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
        <select
          id="gardenId"
          name="gardenId"
          value={gardenId}
          onChange={(e) => setGardenId(e.target.value)}
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
};

export default GardensPage;