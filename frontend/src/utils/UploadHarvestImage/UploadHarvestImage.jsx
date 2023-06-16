import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadHarvestImage = ({ harvest, token }) => {
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const formData = new FormData();
      formData.append("image_url", imageFile);

      await axios.post(`http://localhost:5000/api/harvestImage/${harvest.id}`, formData);
      navigate("/harvests");
    } catch (error) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload Image:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadHarvestImage;