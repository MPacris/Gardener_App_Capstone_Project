import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const HarvestsPage = () => {
  const [user, token] = useAuth();
  const [harvests, setHarvests] = useState([]);

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/harvests", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const harvestsWithPlantType = await Promise.all(
          response.data.map(async (harvest) => {
            try {
              const plantResponse = await axios.get(
                `http://localhost:5000/api/plants/${harvest.plant_id}`,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );

              return {
                ...harvest,
                plant_type: plantResponse.data.type,
              };
            } catch (error) {
              console.log(error.response.data);
              return harvest;
            }
          })
        );

        setHarvests(harvestsWithPlantType);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchHarvests();
  }, [token]);

  return (
    <div className="container">
      <h1>This is the Harvests Page</h1>
      <table>
        <thead>
          <tr>
            <th>Harvest ID</th>
            <th>Rating</th>
            <th>Image URL</th>
            <th>Notes</th>
            <th>Task ID</th>
            <th>Plant ID</th>
            <th>Plant Type</th>
            <th>Task Completed</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {harvests.map((harvest) => (
            <tr key={harvest.id}>
              <td>{harvest.id}</td>
              <td>{harvest.rating}</td>
              <td>{harvest.image_url}</td>
              <td>{harvest.notes}</td>
              <td>{harvest.task_id}</td>
              <td>{harvest.plant_id}</td>
              <td>{harvest.plant_type}</td>
              <td>{harvest.task_completed}</td>
              <td>
                <Link to={`/harvest-details/${harvest.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/create-harvest">
        <p>Add a New Harvest!!</p>
      </Link>
    </div>
  );
};

export default HarvestsPage;