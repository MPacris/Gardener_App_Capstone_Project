import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./CreateTask.css"

const defaultValues = {
  plant_id: "",
  task_type: "",
  task_scheduled: "",
  user_id: "",
};

const taskTypeOptions = [
  "add fertilizer",
  "till soil",
  "plant seed",
  "water",
  "weed",
  "harvest",
  "final harvest",
];

const CreateTask = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const plantIdFromQuery = searchParams.get("plant_id");
    setFormData((prevData) => ({
      ...prevData,
      plant_id: plantIdFromQuery,
    }));
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function postNewTask() {
    try {
      let existingTasks = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      let response = await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFormData(defaultValues);
      navigate('/tasks')
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the required fields are filled in
    if (
      formData.user_id === "" ||
      formData.task_type === "" ||
      formData.task_scheduled === ""
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    postNewTask();
  };

  return (
    <div className="container text-center">
      <h1>Create Task</h1>
      <div className="col-md-4 offset-md-4 center-box">
      <form className="form-control" onSubmit={handleSubmit}>
        <label element="plant_id">Plant ID:</label>
        <input
          type="number"
          id="plant_id"
          name="plant_id"
          value={formData.plant_id}
          onChange={handleInputChange}
        />

        <label element="task_type">Task Type:</label>
        <select
          id="task_type"
          name="task_type"
          value={formData.task_type}
          onChange={handleInputChange}
        >
          <option value="">Select a task type</option>
          {taskTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label element="task_scheduled">Task Scheduled:</label>
        <input
          type="date"
          id="task_scheduled"
          name="task_scheduled"
          value={formData.task_scheduled}
          onChange={handleInputChange}
        />

        <label element="user_id">User ID:</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleInputChange}
        />

        <button type="submit">Create Task</button>
      </form>

      <Link to="/tasks">
        <p>Go To All Tasks</p>
      </Link>

      </div>  
    </div>
  );
};

export default CreateTask;