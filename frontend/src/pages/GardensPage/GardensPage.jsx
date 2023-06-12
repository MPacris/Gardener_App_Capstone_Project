import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const GardensPage = () => {
  const [user, token] = useAuth();
  const [gardens, setGardens] = useState([]);

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

  return (
    <div className="container">
      <h1>This is the Gardens Page</h1>
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
    </div>
  );
};

export default GardensPage;