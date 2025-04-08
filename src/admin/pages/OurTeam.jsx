// src/admin/pages/OurTeam.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import { Trash2 } from "lucide-react";
import styles from "../styles/Admin.module.css";

const OurTeam = () => {
  const [formData, setFormData] = useState({
    section_name: "our_team",
    title: "Meet the Team",
    heading: "Our Professional Squad",
    description: "Dedicated individuals behind our success.",
    details: [
      {
        name: "John Doe",
        image: null,
        designation: "CEO",
        twitter_link: "",
        linkedin_link: "",
        image_preview: ""
      },
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
            description: data.description || "",
            details: data.details?.map((d) => ({
              ...d,
              image: null,
              image_preview: d.image ? `${config.imageurl}/${d.image.replace(/\\/g, '/')}` : "",
            })) || [],
          }));
        }
      } catch (err) {
        console.error("Error fetching team section:", err);
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
      details: [
        ...prev.details,
        {
          name: "",
          image: null,
          designation: "",
          twitter_link: "",
          linkedin_link: "",
          image_preview: ""
        },
      ],
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
      console.error("Error saving team section:", err);
      alert("Failed to save team section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Our Team Section</h2>
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
        <div className={styles.fullWidth}>
          <h3>Details</h3>
          {formData.details.map((detail, idx) => (
            <div key={idx} className={styles.cardBoxSmall}>
              <label>Name
                <input
                  type="text"
                  name="name"
                  value={detail.name}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label>Designation
                <input
                  type="text"
                  name="designation"
                  value={detail.designation}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label>Twitter Link
                <input
                  type="text"
                  name="twitter_link"
                  value={detail.twitter_link}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label>LinkedIn Link
                <input
                  type="text"
                  name="linkedin_link"
                  value={detail.linkedin_link}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label className={styles.fullWidth}>Image
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(idx, e)} />
                {detail.image_preview && <img src={detail.image_preview} alt="preview" className={styles.inlinePreviewLarge} />}
              </label>
              <button type="button" onClick={() => removeDetail(idx)} className={styles.iconDeleteBtn}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addDetail} className={styles.addBtn}>+ Add Member</button>
        </div>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default OurTeam;
