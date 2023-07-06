import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HarvestsPage.css";

const HarvestsPage = () => {
  const [user, token] = useAuth();
  const [harvests, setHarvests] = useState([]);
  const [filterPlantType, setFilterPlantType] = useState("");
  const [filterTaskCompleted, setFilterTaskCompleted] = useState("");
  const [uniquePlantTypes, setUniquePlantTypes] = useState([]);
  const [uniqueTaskCompletedDates, setUniqueTaskCompletedDates] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/harvests?user_id=${user.id}`, {
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
  }, [user.id, token]);

  useEffect(() => {
    const types = [...new Set(harvests.map((harvest) => harvest.plant_type))];
    setUniquePlantTypes(types);

    const dates = [...new Set(harvests.map((harvest) => harvest.task_completed))];
    setUniqueTaskCompletedDates(dates);
  }, [harvests]);

  const filteredHarvests = harvests.filter((harvest) => {
    if (filterPlantType && harvest.plant_type !== filterPlantType) {
      return false;
    }
    if (filterTaskCompleted && harvest.task_completed !== filterTaskCompleted) {
      return false;
    }
    return true;
  });

  const sortedHarvests = filteredHarvests.sort((a, b) => {
    if (sortBy === "plantType") {
      const comparison = a.plant_type.localeCompare(b.plant_type);
      return sortOrder === "asc" ? comparison : -comparison;
    } else if (sortBy === "taskCompleted") {
      const dateA = new Date(a.task_completed);
      const dateB = new Date(b.task_completed);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  return (
    <div className="container">
      <h1 className="welcome-message">Harvests Tracker</h1>
      <div className="filters">
        <label>
          Plant Type:
          <select value={filterPlantType} onChange={(e) => setFilterPlantType(e.target.value)}>
            <option value="">All</option>
            {uniquePlantTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Task Completed:
          <select
            value={filterTaskCompleted}
            onChange={(e) => setFilterTaskCompleted(e.target.value)}
          >
            <option value="">All</option>
            {uniqueTaskCompletedDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="plantType">Plant Type</option>
            <option value="taskCompleted">Task Completed</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className="table-container">
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
            {sortedHarvests.map((harvest) => (
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
      </div>
    </div>
  );
};

export default HarvestsPage;