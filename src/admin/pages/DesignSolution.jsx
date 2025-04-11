// src/admin/pages/DesignSolution.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import { Trash2 } from "lucide-react";
import styles from "../styles/Admin.module.css";

const DesignSolution = () => {
  const [formData, setFormData] = useState({
    section_name: "what_we_are",
    title: "Service Section",
    heading: "Why Choose Us",
    button_label: "",
    button_route: "",
    details: [
      { icon: null, image: null, heading: "Fast", subheading: "Quick delivery", icon_preview: "", image_preview: "" },
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
            button_label: data.button_label || "",
            button_route: data.button_route || "",
            details: data.details?.map((d) => ({
              ...d,
              icon: null,
              image: null,
              icon_preview: d.icon ? `${config.imageurl}/${d.icon.replace(/\\/g, '/')}` : "",
              image_preview: d.image ? `${config.imageurl}/${d.image.replace(/\\/g, '/')}` : "",
            })) || [],
          }));
        }
      } catch (err) {
        console.error("Error fetching section:", err);
      }
    };

    fetchData();
  }, []);

  const generateObjectId = () => {
    return (
      Math.floor(Date.now() / 1000).toString(16) +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
        .toLowerCase()
    );
  };
  

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

  const handleFileChange = (index, field, e) => {
    const file = e.target.files[0];
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = file;
    const previewField = `${field}_preview`;
    updatedDetails[index][previewField] = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const addDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { icon: null, image: null, heading: "", subheading: "", icon_preview: "", image_preview: "" }],
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
    formPayload.append("button_label", formData.button_label);
    formPayload.append("button_route", formData.button_route);

    const detailMeta = formData.details.map(({ icon, image, icon_preview, image_preview, ...rest }) => ({
      ...rest,
      service_id: generateObjectId(), // <- append unique ID
    }));
    
    formPayload.append("details", JSON.stringify(detailMeta));
    

    formData.details.forEach((d) => {
      if (d.icon) formPayload.append("details_icon", d.icon);
      if (d.image) formPayload.append("details_image", d.image);
    });

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving section:", err);
      alert("Failed to save section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>What We Are</h2>
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

export default DesignSolution;