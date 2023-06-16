import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const EditTaskDetails = () => {
  const { task_id } = useParams();
  const [task, setTask] = useState(null);
  const [user, token] = useAuth();
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

  const handleUpdate = async () => {
    try {
      const data = {
        user_id: newUserId || task.user_id,
        task_completed: newCompleted || task.task_completed,
      };

      await axios.put(`http://localhost:5000/api/tasks/${task_id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

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
      <h3>Edit Task Details:</h3>
      <h2>Task ID: {task.id}</h2>
      <h2>Task Type: {task.task_type}</h2>
      <h2>Task Scheduled: {task.task_scheduled}</h2>
      <h2>
        Task Completed:{" "}
        <input
          type="date"
          value={newCompleted}
          onChange={(e) => setNewCompleted(e.target.value)}
          min="1000-01-01"
        />
      </h2>
      <h2>
        User ID:{" "}
        <input
          type="text"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
        />
      </h2>
      <h2>Plant ID: {task.plant_id}</h2>

      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default EditTaskDetails;