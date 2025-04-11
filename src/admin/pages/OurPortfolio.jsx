// src/admin/pages/Portfolio.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import { Trash2 } from "lucide-react";
import styles from "../styles/Admin.module.css";

const Portfolio = () => {
  const [formData, setFormData] = useState({
    section_name: "our_portfolio",
    title: "Our Portfolio",
    heading: "Showcasing Our Work",
    details: [
      { title: "Project Alpha", heading: "E-Commerce App", button_link: "https://example.com", image: null, image_preview: "" },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
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
            details: data.details?.map((d) => ({
              ...d,
              image: null,
              image_preview: d.image ? `${config.imageurl}/${d.image.replace(/\\/g, '/')}` : "",
            })) || [],
          }));
        }
      } catch (err) {
        console.error("Error fetching portfolio section:", err);
      }
    };
    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.details];
    updatedDetails[index][name] = value;
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedDetails = [...formData.details];
    updatedDetails[index].image = file;
    updatedDetails[index].image_preview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const addDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { title: "", heading: "", button_link: "", image: null, image_preview: "" }],
    }));
  };

  const removeDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("heading", formData.heading);

    const detailMeta = formData.details.map(({ image, image_preview, ...rest }) => rest);
    formPayload.append("details", JSON.stringify(detailMeta));

    formData.details.forEach((d) => {
      if (d.image) formPayload.append("details_image", d.image);
    });

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving portfolio section:", err);
      alert("Failed to save portfolio section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Portfolio Section</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleFieldChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleFieldChange} />
        </label>
       
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default Portfolio;
