// src/admin/pages/DetailsBanner.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import { Trash2 } from "lucide-react";
import styles from "../styles/Admin.module.css";

const DetailsBanner = () => {
  const [formData, setFormData] = useState({
    section_name: "banner",
    title: "",
    image: null,
    image_preview: "",
    buttons: [{ label: "", route: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetBanner, {
          section_name: formData.section_name,
        });
        const data = res.data?.data;

        if (data) {
          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            buttons: data.button || [{ label: "", route: "" }],
            image_preview: data.image ? `${config.imageurl}/${data.image.replace(/\\/g, "/")}` : ""
          }));
        }
      } catch (err) {
        console.error("Error fetching details banner section:", err);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (e) => {
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

  const handleButtonChange = (index, e) => {
    const { name, value } = e.target;
    const updatedButtons = [...formData.buttons];
    updatedButtons[index][name] = value;
    setFormData((prev) => ({ ...prev, buttons: updatedButtons }));
  };

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      buttons: [...prev.buttons, { label: "", route: "" }],
    }));
  };

  const removeButton = (index) => {
    const updated = formData.buttons.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, buttons: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("button", JSON.stringify(formData.buttons));
    if (formData.image) formPayload.append("image", formData.image);

    try {
      const res = await axios.post(config.SaveOrUpdateBanner, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving details banner section:", err);
      alert("Failed to save details banner section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Details Banner</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleFieldChange} />
        </label>
        <label className={styles.fullWidth}>Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image_preview && <img src={formData.image_preview} alt="preview" className={styles.inlinePreviewLarge} />}
        </label>

        <div className={styles.fullWidth}>
          <h3>Buttons</h3>
          {formData.buttons.map((button, index) => (
            <div key={index} className={styles.cardBoxSmall}>
              <label>Label
                <input
                  type="text"
                  name="label"
                  value={button.label}
                  onChange={(e) => handleButtonChange(index, e)}
                />
              </label>
              <label>Route
                <input
                  type="text"
                  name="route"
                  value={button.route}
                  onChange={(e) => handleButtonChange(index, e)}
                />
              </label>
              <button type="button" onClick={() => removeButton(index)} className={styles.iconDeleteBtn}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addButton} className={styles.addBtn}>+ Add Button</button>
        </div>

        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default DetailsBanner;
