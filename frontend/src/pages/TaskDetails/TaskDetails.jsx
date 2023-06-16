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
  const [editUser, setEditUser] = useState(false);
  const [editCompleted, setEditCompleted] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newCompleted, setNewCompleted] = useState("");
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
        console.error(error);
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
      console.error(error);
    }
  };

  const handleEdit = (field) => {
    if (field === "user_id") {
      setEditUser(true);
    } else if (field === "task_completed") {
      setEditCompleted(true);
    }
  };

  const handleUpdate = async (field) => {
    try {
      const data = {
        user_id: field === "user_id" ? newUserId : task.user_id,
        task_completed:
          field === "task_completed" ? newCompleted : task.task_completed,
      };

      await axios.put(`http://localhost:5000/api/tasks/${task_id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setEditUser(false);
      setEditCompleted(false);

      navigate(`/tasks`);
    } catch (error) {
      console.error(error);
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
        Task Completed:{" "}
        {editCompleted ? (
          <input
            type="date"
            value={newCompleted}
            onChange={(e) => setNewCompleted(e.target.value)}
            min="1000-01-01"
          />
        ) : (
          <>
            {task.task_completed || "Not Completed"}{" "}
            <button onClick={() => handleEdit("task_completed")}>Edit</button>
          </>
        )}
        {editCompleted && (
          <button onClick={() => handleUpdate("task_completed")}>Save</button>
        )}
      </h2>
      <h2>
        User ID:{" "}
        {editUser ? (
          <input
            type="text"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
          />
        ) : (
          <>
            {task.user_id}{" "}
            <button onClick={() => handleEdit("user_id")}>Edit</button>
          </>
        )}
        {editUser && <button onClick={() => handleUpdate("user_id")}>Save</button>}
      </h2>
      <h2>Plant ID: {task.plant_id}</h2>

      <h3>Create Harvest</h3>

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