import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TaskDetails = () => {
  const { task_id } = useParams();
  const [task, setTask] = useState(null);
  const [user, token] = useAuth();
  const [harvestFormData, setHarvestFormData] = useState({
    rating: "",
    image_url: "",
    notes: "",
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${task_id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setTask(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchTaskDetails();
  }, [task_id, token]);

  const handleHarvestChange = (e) => {
    const { name, value } = e.target;

    setHarvestFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHarvestSubmit = async (e) => {
    e.preventDefault();

    try {
      const harvestData = {
        ...harvestFormData,
        task_id,
        plant_id: task.plant_id,
        task_completed: task.task_completed,
      };

      await axios.post("http://localhost:5000/api/harvests", harvestData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log("Harvest created:", harvestData);
      navigate("/tasks"); 
    } catch (error) {

    }
  };

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div>
      <h3>Task Information:</h3>
      <h2>Task ID: {task.id}</h2>
      <h2>Task Type: {task.task_type}</h2>
      <h2>Task Scheduled: {task.task_scheduled}</h2>
      <h2>
        Task Completed: {task.task_completed}{" "}
        <Link to={`/tasks/${task_id}/edit`}>(Edit)</Link> 
      </h2>
      <h2>
        User ID: {task.user_id}{" "}
        <Link to={`/tasks/${task_id}/edit`}>(Edit)</Link> 
      </h2>
      <h2>Plant ID: {task.plant_id}</h2>

      <form onSubmit={handleHarvestSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={harvestFormData.rating}
            onChange={handleHarvestChange}
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={harvestFormData.image_url}
            onChange={handleHarvestChange}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={harvestFormData.notes}
            onChange={handleHarvestChange}
          ></textarea>
        </div>
        <button type="submit">Create Harvest</button>
      </form>

      <Link to="/plants">Back to Plants</Link>
      <Link to="/tasks">Back to Tasks</Link>

      {task.task_type === "harvest" && (
        <Link to={`/create-harvest?task_id=${task_id}`}>Create Harvest</Link>
      )}
    </div>
  );
};

export default TaskDetails;