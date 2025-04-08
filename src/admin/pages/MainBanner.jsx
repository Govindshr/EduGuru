// src/admin/pages/MainBanner.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const MainBanner = () => {
  const [formData, setFormData] = useState({
    section_name: "main_banner",
    title: "Big Sale",
    heading: "Save 50%",
    subheading: "On all items",
    description: "Enjoy discounts like never before!",
    buttonRoute: "/shop-now",
    buttonLabel: "Shop Now",
    profileImage: null,
    profileImagePreview: ""
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
            subheading: data.subheading || "",
            description: data.description || "",
            buttonRoute: data.button_route || "",
            buttonLabel: data.button_label || "",
            profileImage: null,
            profileImagePreview: data.profile_image ? `${config.imageurl}/${data.profile_image.replace(/\\/g, '/')}` : ""
          }));
        }
      } catch (err) {
        console.error("Error fetching main banner:", err);
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
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("heading", formData.heading);
    formPayload.append("subheading", formData.subheading);
    formPayload.append("description", formData.description);
    formPayload.append("button_route", formData.buttonRoute);
    formPayload.append("button_label", formData.buttonLabel);
    if (formData.profileImage) formPayload.append("profile_image", formData.profileImage);

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving main banner:", err);
      alert("Failed to save main banner section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Main Banner Form</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
        </label>
        <label>Subheading
          <input type="text" name="subheading" value={formData.subheading} onChange={handleChange} />
        </label>
        <label>Button Route
          <input type="text" name="buttonRoute" value={formData.buttonRoute} onChange={handleChange} />
        </label>
        <label>Button Label
          <input type="text" name="buttonLabel" value={formData.buttonLabel} onChange={handleChange} />
        </label>
        <label>Profile Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label className={styles.fullWidth}>Description
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <div className={`${styles.imagePreview} ${styles.fullWidth}`}>
          {formData.profileImagePreview && (
            <img src={formData.profileImagePreview} alt="Preview" />
          )}
        </div>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default MainBanner;