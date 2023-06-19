import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TasksPage.css"

const TasksPage = () => {
  const [user, token] = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filterTaskCompleted, setFilterTaskCompleted] = useState("");
  const [uniqueTaskTypes, setUniqueTaskTypes] = useState([]);
  const [uniqueTaskCompletedDates, setUniqueTaskCompletedDates] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const taskData = response.data;

        const plantIds = taskData.map((task) => task.plant_id);
        const plantResponse = await axios.get(
          `http://localhost:5000/api/plants?ids=${plantIds.join(",")}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const plants = plantResponse.data;

        const updatedTasks = taskData.map((task) => {
          const plant = plants.find((plant) => plant.id === task.plant_id);
          return {
            ...task,
            plant_type: plant ? plant.type : "",
          };
        });

        setTasks(updatedTasks);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchTasks();
  }, [token]);

  useEffect(() => {
    const types = [...new Set(tasks.map((task) => task.task_type))];
    setUniqueTaskTypes(types);

    const dates = [...new Set(tasks.map((task) => task.task_completed))];
    setUniqueTaskCompletedDates(dates);
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filterTaskCompleted && task.task_completed !== filterTaskCompleted) {
      return false;
    }
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === "taskType") {
      const comparison = a.task_type.localeCompare(b.task_type);
      return sortOrder === "asc" ? comparison : -comparison;
    } else if (sortBy === "taskCompleted") {
      const dateA = new Date(a.task_completed);
      const dateB = new Date(b.task_completed);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  useEffect(() => {
    // Adjust the width of the sticky header cells
    const tableHeaders = tableRef.current.querySelectorAll("th");
    tableHeaders.forEach((header) => {
      const cellWidth = header.offsetWidth;
      header.style.width = `${cellWidth}px`;
    });
  }, [sortedTasks]);

  return (
    <div className="container">
      <h1>This is the Tasks Page</h1>
      <div className="filters">
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
            <option value="taskType">Task Type</option>
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
      <div className="table-container" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Type</th>
              <th>Task Scheduled</th>
              <th>Task Completed</th>
              <th>User ID</th>
              <th>Plant ID</th>
              <th>Plant Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className={task.task_completed ? "" : "task-incomplete"}>
                <td>{task.id}</td>
                <td>{task.task_type}</td>
                <td>{task.task_scheduled}</td>
                <td>{task.task_completed}</td>
                <td>{task.user_id}</td>
                <td>{task.plant_id}</td>
                <td>{task.plant_type}</td>
                <td>
                  <Link to={`/task-details/${task.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/create-task">
        <p>Add a New Task!!</p>
      </Link>
    </div>
  );
};

export default TasksPage;