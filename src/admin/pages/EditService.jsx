// src/admin/pages/EditService.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    type: "",
    icon: null,
    image: null,
    icon_preview: "",
    image_preview: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.post(config.GetServicesById, {
            id: id,
          });
        const data = res.data.data;
        console.log("ye edit karna he ", res.data.data)
        setFormData({
          name: data.name,
          heading: data.heading,
          type: data.type,
          icon: null,
          image: null,
          icon_preview: data.icon || "",
          image_preview: data.image || "",
          
        });
      } catch (err) {
        console.error("Error fetching service:", err);
        alert("Failed to load service data");
      }
    };

    fetchService();
  }, [id]);

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
    payload.append("id", id); // ✅ Include ID in form body
    payload.append("name", formData.name);
    payload.append("heading", formData.heading);
    payload.append("type", formData.type);
    if (formData.icon) payload.append("icon", formData.icon);
    if (formData.image) payload.append("image", formData.image);
  
    try {
      const res = await axios.post(config.EditService, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/admin/services-list");
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Update failed");
    }
  };
  

  return (
    <div className={styles.formWrapper}>
      <h2>Edit Service</h2>
       {/* <button className={styles.addBtn} onClick={() => navigate("/admin/page-content-list")}>Back</button> */}
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Name *
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Heading *
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} required />
        </label>
        <label>Type *
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={styles.selectDropdown}
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="portfolio">Portfolio</option>
            <option value="whatweare">What We Are</option>
          </select>
        </label>

        {formData.type === "whatweare" && (
          <label>Icon
            <input type="file" onChange={(e) => handleFileChange("icon", e)} />
            {formData.icon_preview && (
  <img
    src={
      formData.icon_preview.startsWith("blob:")
        ? formData.icon_preview
        : formData.icon_preview.startsWith("http") || formData.icon_preview.startsWith("/")
        ? formData.icon_preview
        : `${config.imageurl}/${formData.icon_preview}`
    }
    className={styles.inlinePreview}
    alt="Icon preview"
  />
)}
 </label>
        )}

        <label>Image
          <input type="file" onChange={(e) => handleFileChange("image", e)} />
          {formData.image_preview && (
  <img
    src={
      formData.image_preview.startsWith("blob:")
        ? formData.image_preview
        : formData.image_preview.startsWith("http") || formData.image_preview.startsWith("/")
        ? formData.image_preview
        : `${config.imageurl}/${formData.image_preview}`
    }
    className={styles.inlinePreview}
    alt="Image preview"
  />
)}


       </label>

        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Update</button>
      </form>
    </div>
  );
};

export default EditService;
