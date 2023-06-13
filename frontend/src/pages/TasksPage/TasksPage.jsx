import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const TasksPage = () => {
  const [user, token] = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div className="container">
      <h1>This is the Tasks Page</h1>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Type</th>
            <th>Task Scheduled</th>
            <th>Task Completed</th>
            <th>User ID</th>
            <th>Plant ID</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.task_type}</td>
              <td>{task.task_scheduled}</td>
              <td>{task.task_completed}</td>
              <td>{task.user_id}</td>
              <td>{task.plant_id}</td>
              <td>
                <Link to={`/task-details/${task.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/create-task">
        <p>Add a New Task!!</p>
      </Link>
    </div>
  );
};

export default TasksPage;