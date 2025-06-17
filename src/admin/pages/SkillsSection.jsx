// src/admin/pages/SkillsSection.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import { Trash2 } from "lucide-react";
import styles from "../styles/Admin.module.css";

const SkillsSection = () => {
  const [formData, setFormData] = useState({
    section_name: "our_skills",
    title: "Our Skills",
    heading: "Expertise We Offer",
    image: null,
    description: "We specialize in multiple domains with strong expertise.",
   details: [
  { skill_name: "JavaScript", rating_value: "5", image: null, image_preview: "" },
]

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
            description: data.description || "",
            details: data.details?.map((d) => ({
  ...d,
  image: null,
  image_preview: d.image ? `${config.imageurl}/${d.image.replace(/\\/g, '/')}` : "",
})) || [],

            image_preview: data.cover_image ? `${config.imageurl}/${data.cover_image.replace(/\\/g, "/")}` : "",
          }));
        }
      } catch (err) {
        console.error("Error fetching skills section:", err);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleDetailImageChange = (index, e) => {
  const file = e.target.files[0];
  if (file) {
    const updated = [...formData.details];
    updated[index].image = file;
    updated[index].image_preview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, details: updated }));
  }
};

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.details];
    updatedDetails[index][name] = value;
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const addDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { skill_name: "", rating_value: "" }],
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
  formPayload.append("description", formData.description);

  if (formData.image) {
    formPayload.append("cover_image", formData.image);
  }

  // prepare details JSON without image and image_preview
  const detailsData = formData.details.map(({ image, image_preview, ...rest }, index) => {
    if (!image && image_preview) {
      // retain image path if no new file selected
      rest.image = image_preview.replace(config.imageurl + "/", "");
    }
    return rest;
  });

  formPayload.append("details", JSON.stringify(detailsData));

  // only new files are appended as binary data
  formData.details.forEach((d) => {
    if (d.image) {
      formPayload.append("details_image", d.image);
    }
  });

  try {
    const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(res.data.message);
  } catch (err) {
    console.error("Error saving skills section:", err);
    alert("Failed to save skills section");
  }
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

  return (
    <div className={styles.formWrapper}>
      <h2>Our Skills</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleFieldChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleFieldChange} />
        </label>
        <label className={styles.fullWidth}>Description
          <textarea name="description" value={formData.description} onChange={handleFieldChange} />
        </label>
         <label>Image
          <input type="file" onChange={handleImageChange} />
          {formData.image_preview && (
            <img src={formData.image_preview} alt="preview" className={styles.inlinePreview} />
          )}
        </label>
        <div className={styles.fullWidth}>
          <h3>Details</h3>
          {formData.details.map((detail, idx) => (
            <div key={idx} className={styles.cardBoxSmall}>
              <label>Skill Name
                <input
                  type="text"
                  name="skill_name"
                  value={detail.skill_name}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label>Rating Percentage
                <input
                  type="number"
                  name="rating_value"
                  value={detail.rating_value}
                  min="0"
                  max="100"
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label className={styles.fullWidth}>Image
  <input type="file" accept="image/*" onChange={(e) => handleDetailImageChange(idx, e)} />
  {detail.image_preview && (
    <img src={detail.image_preview} alt="preview" className={styles.inlinePreview} />
  )}
</label>

              <button type="button" onClick={() => removeDetail(idx)} className={styles.iconDeleteBtn}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addDetail} className={styles.addBtn}>+ Add Skill</button>
        </div>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default SkillsSection;
