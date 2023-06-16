import React, { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom"; // Add the useNavigate hook

const EditTaskDetails = ({ task, token, handleSave }) => {
  const { task_id } = useParams(); // Get the task ID from the URL
  const [editUser, setEditUser] = useState(false);
  const [editCompleted, setEditCompleted] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newCompleted, setNewCompleted] = useState(task.task_completed || "");
  const navigate = useNavigate(); // Add the useNavigate hook

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
        task_completed: field === "task_completed" ? newCompleted : task.task_completed,
      };

      await axios.put(`http://localhost:5000/api/tasks/${task_id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      handleSave(data);

      setEditUser(false);
      setEditCompleted(false);
      
      navigate(`/tasks/${task_id}`); // Navigate back to the TaskDetails page
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
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
            {newCompleted ? newCompleted : "Not Completed"}{" "}
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

      <Link to={`/tasks/${task_id}`}>Back to Task Details</Link> {/* Add the link back to TaskDetails */}
    </div>
  );
};

export default EditTaskDetails;