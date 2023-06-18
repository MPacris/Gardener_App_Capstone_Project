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

        const harvestData = response.data;

        const plantIds = harvestData.map((harvest) => harvest.plant_id);
        const plantResponse = await axios.get(
          `http://localhost:5000/api/plants?ids=${plantIds.join(",")}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const plants = plantResponse.data;

        const updatedHarvests = harvestData.map((harvest) => {
          const plant = plants.find((plant) => plant.id === harvest.plant_id);
          return {
            ...harvest,
            plant_type: plant ? plant.type : "",
          };
        });

        setHarvests(updatedHarvests);
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
            <tr key={harvest.id} className={harvest.task_completed ? "" : "task-incomplete"}>
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