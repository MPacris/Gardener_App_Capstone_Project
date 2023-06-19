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
    <form onSubmit={handleSubmit} className="section bg-light p-3 mb-4">
      <h3 className="mb-3">Upload Harvest Image:</h3>
      <div className="form-group">
        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" onChange={handleFileChange} className="form-control-file" />
      </div>
      <button type="submit" className="btn btn-primary">Upload</button>
    </form>
  );
};

export default UploadHarvestImage;