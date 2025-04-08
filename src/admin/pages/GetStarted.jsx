// src/admin/pages/GetStarted.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const GetStarted = () => {
  const [formData, setFormData] = useState({
    section_name: "get_started",
    title: "Ready to Start?",
    heading: "Let’s Build Something Great Together",
    description: "Tell us about your idea and we’ll turn it into reality.",
    image: null,
    image_preview: ""
  });

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: formData.section_name,
        });
        const data = res.data?.data;
        if (data) {
          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            heading: data.heading || "",
            description: data.description || "",
            image: null,
            image_preview: data.image ? `${config.imageurl}/${data.image.replace(/\\/g, '/')}` : ""
          }));
        }
      } catch (err) {
        console.error("Error fetching section:", err);
      }
    };
    fetchSection();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("heading", formData.heading);
    formPayload.append("description", formData.description);
    if (formData.image) formPayload.append("image", formData.image);

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving get started section:", err);
      alert("Failed to save get started section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Get Started Section</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
        </label>
        <label className={styles.fullWidth}>Description
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label className={styles.fullWidth}>Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image_preview && (
            <img src={formData.image_preview} alt="preview" className={styles.inlinePreviewLarge} />
          )}
        </label>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default GetStarted;
