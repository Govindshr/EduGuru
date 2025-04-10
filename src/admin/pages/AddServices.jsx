// src/admin/pages/AddService.jsx
import React, { useState } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const AddService = () => {
  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    subhead: "",
    icon: null,
    image: null,
    icon_preview: "",
    image_preview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [field]: file,
      [`${field}_preview`]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("heading", formData.heading);
    payload.append("subhead", formData.subhead);
    if (formData.icon) payload.append("icon", formData.icon);
    if (formData.image) payload.append("image", formData.image);

    try {
      const res = await axios.post(config.CreateService, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error submitting service:", err);
      alert("Submission failed");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} required />
        </label>
        <label>Subhead
          <input type="text" name="subhead" value={formData.subhead} onChange={handleChange} />
        </label>
        <label>Icon
          <input type="file" onChange={(e) => handleFileChange("icon", e)} />
          {formData.icon_preview && <img src={formData.icon_preview} className={styles.inlinePreview} alt="Icon preview" />}
        </label>
        <label>Image
          <input type="file" onChange={(e) => handleFileChange("image", e)} />
          {formData.image_preview && <img src={formData.image_preview} className={styles.inlinePreview} alt="Image preview" />}
        </label>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default AddService;