import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ plant, token, handleImageUpload }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image_url", imageFile);

      await axios.post(`http://localhost:5000/api/plantImage/${plant.id}`, formData);

      handleImageUpload();
    } catch (error) {
      // Handle error
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

export default UploadImage;