import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TaskDetails = () => {
  const { task_id } = useParams();
  const [task, setTask] = useState(null);
  const [user, token] = useAuth();
  const [editUser, setEditUser] = useState(false);
  const [editCompleted, setEditCompleted] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newCompleted, setNewCompleted] = useState("");

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

  const handleEdit = (field) => {
    if (field === "user_id") {
      setEditUser(true);
    } else if (field === "task_completed") {
      setEditCompleted(true);
    }
  };

  const handleSave = async (field) => {
    try {
      const data = {
        user_id: field === "user_id" ? newUserId : task.user_id,
        task_completed: field === "task_completed" ? newCompleted : task.task_completed,
      };

      await axios.put(`http://localhost:5000/api/tasks/${task_id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setTask((prevTask) => ({
        ...prevTask,
        user_id: data.user_id,
        task_completed: data.task_completed,
      }));

      setEditUser(false);
      setEditCompleted(false);
    } catch (error) {
      // Handle error
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
            {task.task_completed ? task.task_completed : "Not Completed"}{" "}
            <button onClick={() => handleEdit("task_completed")}>Edit</button>
          </>
        )}
        {editCompleted && (
          <button onClick={() => handleSave("task_completed")}>Save</button>
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
            {task.user_id} <button onClick={() => handleEdit("user_id")}>Edit</button>
          </>
        )}
        {editUser && <button onClick={() => handleSave("user_id")}>Save</button>}
      </h2>
      <h2>Plant ID: {task.plant_id}</h2>

      <Link to="/plants">Back to Plants</Link>
      <Link to="/tasks">Back to Tasks</Link>

      {task.task_type === "harvest" && (
        <Link to={`/create-harvest?task_id=${task_id}`}>Create Harvest</Link>
      )}
    </div>
  );
};

export default TaskDetails;