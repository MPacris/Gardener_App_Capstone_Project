import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import UploadHarvestImage from "../../utils/UploadHarvestImage/UploadHarvestImage";

const TaskDetails = () => {
  const { task_id } = useParams();
  const [task, setTask] = useState(null);
  const [user, token] = useAuth();
  const [harvestFormData, setHarvestFormData] = useState({
    rating: "",
    notes: "",
  });
  const [plantType, setPlantType] = useState("");
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

        const plantResponse = await axios.get(
          `http://localhost:5000/api/plants/${response.data.plant_id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setPlantType(plantResponse.data.type);
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

  const handleImageUpload = async (formData) => {
    try {
      await axios.post(
        `http://localhost:5000/api/harvestImage/${task.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      // Handle error
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
      <h2>Task Completed: {task.task_completed}</h2>
      <h2>Plant ID: {task.plant_id}</h2>
      <h2>Plant Type: {plantType}</h2>

      <Link to="/plants">Back to Plants</Link>
      <Link to="/tasks">Back to Tasks</Link>
      <Link to={`/edit-task-details/${task.id}?user_id=${task.user_id}`}>
        Edit Task Details
      </Link>

      {task.task_type === "harvest" && (
        <div>
          <h3>Create Harvest</h3>
          <div>
            <form onSubmit={handleHarvestSubmit}>
              <div>
                <label element="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={harvestFormData.rating}
                  onChange={handleHarvestChange}
                />
              </div>
              <div>
                <label>Upload Image:</label>
                <UploadHarvestImage
                  onImageUpload={handleImageUpload}
                  harvest={task}
                  token={token}
                />
              </div>
              <div>
                <label element="notes">Notes:</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={harvestFormData.notes}
                  onChange={handleHarvestChange}
                ></textarea>
              </div>
              <button type="submit">Create Harvest</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;