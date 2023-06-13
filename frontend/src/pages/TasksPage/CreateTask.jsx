import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const defaultValues = {
    plant_id: '',
    task_type: '',
    task_scheduled: '',
    task_completed: '',
    user_id: '',
  };
  
const CreateTask = () => {
    const [user, token] = useAuth();
    const [formData, setFormData] = useState(defaultValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

async function postNewTask() {
    try {
        let existingTasks = await axios.get('http://localhost:5000/api/tasks',{
        headers: {
            Authorization: 'Bearer ' + token,
            },   
        });

        
        let response = await axios.post('http://localhost:5000/api/tasks', formData, {
            headers: {
            Authorization: 'Bearer ' + token,
        },
      });
      setFormData(defaultValues);


      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewTask();
  };
  return (
    <div>
        <h1>Create Task</h1>

        <form className='form' onSubmit={handleSubmit}>

        <label element="plant_id">Plant ID:</label>
        <input
          type="text"
          id="plant_id"
          name="plant_id"
          value={formData.plant_id}
          onChange={handleInputChange}
          />

        <label element="task_type">Task Type:</label>
        <input
          type="text"
          id="task_type"
          name="task_type"
          value={formData.task_type}
          onChange={handleInputChange}
          />

        <label element="task_scheduled">Task Scheduled:</label>
        <input
          type="datetime"
          id="task_scheduled"
          name="task_scheduled"
          value={formData.task_scheduled}
          onChange={handleInputChange}
          />

        <label element="task_completed">Task Completed:</label>
        <input
          type="datetime"
          id="task_completed"
          name="task_completed"
          value={formData.task_completed}
          onChange={handleInputChange}
          />

        
        <label element="user_id">User ID:</label>
        <input
          type="text"
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
  );
};


export default CreateTask;