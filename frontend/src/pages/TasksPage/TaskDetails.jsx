import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TaskDetails = () => {
  const { task_id } = useParams();
  const [task, setTask] = useState(null);
  const [user, token] = useAuth();
  const [editedTask, setEditedTask] = useState(null);

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
      setEditedTask(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const saveTaskChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task_id}`,
        editedTask,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTask(editedTask);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [task_id, token]);

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div>
      <h3>Task Information:</h3>
      <h2>Task ID: {task.id}</h2>
      <h2>Task Type: {task.task_type}</h2>
      <h2>Task Scheduled: {task.task_scheduled}</h2>
      <h2>Task Completed: {task.task_completed}</h2>
      <h2>User ID: {task.user_id}</h2>
      <h2>Plant ID: {task.plant_id}</h2>

      {task.task_type === "harvest" && (
        <Link to={`/create-harvest?task_id=${task_id}`}>Create Harvest</Link>
      )}

    </div>
  );
};

export default TaskDetails;