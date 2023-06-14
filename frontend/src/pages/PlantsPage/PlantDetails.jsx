import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PlantDetails = () => {
  const { plant_id } = useParams();
  const [plant, setPlant] = useState(null);
  const [user, token] = useAuth();
  const [editType, setEditType] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [newType, setNewType] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  console.log(plant);
  const fetchPlantDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/plants/${plant_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setPlant(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchPlantDetails();
  }, [plant_id, token]);

  const handleSave = async (field) => {
    try {
      const data = {
        type: field === "type" ? newType : plant.type,
        location: field === "location" ? newLocation : plant.location,
      };

      await axios.put(`http://localhost:5000/api/plants/${plant_id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setPlant((prevPlant) => ({
        ...prevPlant,
        type: data.type,
        location: data.location,
      }));

      setEditType(false);
      setEditLocation(false);
    } catch (error) {
      // Handle error
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image_url", imageFile);

      const response = await axios.post(
        `http://localhost:5000/api/plantImage/${plant_id}`,
        formData
      );

      const { fileName } = response.data;

      setPlant((prevPlant) => ({
        ...prevPlant,
        image_url: fileName,
      }));

      console.log("Image uploaded successfully");
    } catch (error) {
      // Handle error
      console.log("Image upload failed", error);
    }
  };

  if (!plant) {
    return <p>Plant not found</p>;
  }

  return (
    <div>
      <h3>Plant Information:</h3>
      <h2>
        {editType ? (
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
        ) : (
          <>
            {plant.type} <button onClick={() => setEditType(true)}>Edit</button>
          </>
        )}
        {editType && <button onClick={() => handleSave("type")}>Save</button>}
      </h2>
      <h2>
        {editLocation ? (
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        ) : (
          <>
            {plant.location}{" "}
            <button onClick={() => setEditLocation(true)}>Edit</button>
          </>
        )}
        {editLocation && (
          <button onClick={() => handleSave("location")}>Save</button>
        )}
      </h2>

      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload Image</button>

      <img
        src={`http://127.0.0.1:5000/static/images/${plant.image_url}`}
        alt="Plant"
      />

      <p>
        <Link to="/plants">Back to Plants</Link>

        <Link to={`/create-task?plant_id=${plant_id}`}>
        <p>Create task!!</p>
      </Link>
      </p>
    </div>
  );
};

export default PlantDetails;
