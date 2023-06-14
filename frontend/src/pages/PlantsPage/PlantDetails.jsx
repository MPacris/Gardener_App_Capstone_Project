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
  const [editImageUrl, setEditImageUrl] = useState(false);
  const [editGardenId, setEditGardenId] = useState(false);
  const [newType, setNewType] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newGardenId, setNewGardenId] = useState("");

  const navigate = useNavigate();

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
    } catch (error) {}
  };

  useEffect(() => {
    fetchPlantDetails();
  }, [plant_id, token]);

  const handleSave = async (field) => {
    try {
      const data = {
        type: field === "type" ? newType : plant.type,
        location: field === "location" ? newLocation : plant.location,
        image_url: field === "image_url" ? newImageUrl : plant.image_url,
        garden_id: field === "garden_id" ? newGardenId : plant.garden_id,
      };

      await axios.put(
        `http://localhost:5000/api/plants/${plant_id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setPlant((prevPlant) => ({
        ...prevPlant,
        type: data.type,
        location: data.location,
        image_url: data.image_url,
        garden_id: data.garden_id,
      }));

      setEditType(false);
      setEditLocation(false);
      setEditImageUrl(false);
      setEditGardenId(false);
    } catch (error) {
      // Handle error
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
            {plant.type}{" "}
            <button onClick={() => setEditType(true)}>Edit</button>
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
      <h2>
        {editImageUrl ? (
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
        ) : (
          <>
            {plant.image_url}{" "}
            <button onClick={() => setEditImageUrl(true)}>Edit</button>
          </>
        )}
        {editImageUrl && (
          <button onClick={() => handleSave("image_url")}>Save</button>
        )}
      </h2>
      <h2>
        {editGardenId ? (
          <input
            type="text"
            value={newGardenId}
            onChange={(e) => setNewGardenId(e.target.value)}
          />
        ) : (
          <>
            {plant.garden_id}{" "}
            <button onClick={() => setEditGardenId(true)}>Edit</button>
          </>
        )}
        {editGardenId && (
          <button onClick={() => handleSave("garden_id")}>Save</button>
        )}
      </h2>

      <Link to={`/create-task?plant_id=${plant_id}`}>
        <p>Create Task</p>
      </Link>
    </div>
  );
};

export default PlantDetails;