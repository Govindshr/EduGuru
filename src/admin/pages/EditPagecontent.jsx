// src/admin/pages/EditPageContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const EditPageContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [previewAreaImages, setPreviewAreaImages] = useState([]); // ⬅️ NEW


  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    heading: "",
    description: "",
    image: null,
    image_preview: "",
    area_heading: "",
    area_description: "",
    area_images: [],
    area_text: "",
    area_button: "",
    area_route: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [servicesRes, contentRes] = await Promise.all([
          axios.post(config.GetAllServices),
          axios.post(config.GetPageContentById, { id }),
        ]);

        setCategories(servicesRes.data?.data || []);

console.log("2",contentRes.data.data)

        const data = contentRes.data.data[0];
        setFormData({
          category_id: data.category_id,
          heading: data.heading,
          description: data.description,
          image: null,
          image_preview: data.image || "",
          area_heading: data.area_heading,
          area_description: data.area_description,
          area_images: [], // for new uploads only
          area_text: data.area_text,
          area_button: data.area_button,
          area_route: data.area_route,
        });
        
        setPreviewAreaImages(data.area_images || []); // ⬅️ NEW
        
      } catch (err) {
        console.error("Failed to load data:", err);
        alert("Failed to load data");
      }
    };

    fetchInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        image_preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleAreaImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      area_images: files,
    }));
    setPreviewAreaImages([]); // ⬅️ clear previews since new images are selected
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("id", id);
    payload.append("category_id", formData.category_id);
    payload.append("heading", formData.heading);
    payload.append("description", formData.description);
    payload.append("area_heading", formData.area_heading);
    payload.append("area_description", formData.area_description);
    payload.append("area_text", formData.area_text);
    payload.append("area_button", formData.area_button);
    payload.append("area_route", formData.area_route);

    if (formData.image) payload.append("image", formData.image);
    formData.area_images.forEach((file) => {
      payload.append("area_images", file);
    });

    try {
      const res = await axios.post(config.EditPageContent, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/admin/page-content-list");
    } catch (err) {
      console.error("Error updating page content:", err);
      alert("Failed to update content");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Edit Page Content</h2>
        <button className={styles.addBtn} onClick={() => navigate("/admin/services-list")}>Back</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Service
          <select name="category_id" className="form-control" value={formData.category_id} onChange={handleChange}>
            <option value="">Select Service</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label>Name
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
        </label>

        <label className={styles.fullWidth}>Description
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label className={styles.fullWidth}>Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image_preview && (
            <img
              src={formData.image_preview.startsWith("blob:") ? formData.image_preview : `${config.imageurl}/${formData.image_preview}`}
              alt="preview"
              className={styles.inlinePreviewLarge}
            />
          )}
        </label>

        <label>Area Of Function Heading
          <input type="text" name="area_heading" value={formData.area_heading} onChange={handleChange} />
        </label>

        <label>Area Of Function Description
          <textarea name="area_description" value={formData.area_description} onChange={handleChange} />
        </label>

        <label>Area Of Function Right Top Text
          <input type="text" name="area_text" value={formData.area_text} onChange={handleChange} />
        </label>

        <label className={styles.fullWidth}>Area Images
          <input type="file" multiple onChange={handleAreaImagesChange} />
          {previewAreaImages.length > 0 && (
  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
    {previewAreaImages.map((img, i) => (
      <img
        key={i}
        src={`${config.imageurl}/${img}`}
        alt={`area_img_${i}`}
        style={{ width: "100px", height: "auto", borderRadius: "6px" }}
      />
    ))}
  </div>
)}

        </label>

        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Update</button>
      </form>
    </div>
  );
};

export default EditPageContent;