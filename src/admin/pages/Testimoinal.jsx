// src/admin/pages/Testimonials.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import { Trash2 } from "lucide-react";
import styles from "../styles/Admin.module.css";

const Testimonials = () => {
  const [formData, setFormData] = useState({
    section_name: "client_testimonials",
    title: "Client Testimonials",
    heading: "Hear what our clients say",
    cover_image: null,
    cover_image_preview: "",
    details: [
      {
        rating: "5",
        note: "Excellent work!",
        name: "Alice",
        image: null,
        image_preview: "",
        designation: "CTO",
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
            cover_image_preview: data.cover_image ? `${config.imageurl}/${data.cover_image.replace(/\\/g, '/')}` : "",
            details:
              data.details?.map((d) => ({
                ...d,
                image: null,
                image_preview: d.image ? `${config.imageurl}/${d.image.replace(/\\/g, '/')}` : "",
              })) || [],
          }));
        }
      } catch (err) {
        console.error("Error fetching testimonials section:", err);
      }
    };
    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cover_image: file,
        cover_image_preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.details];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, details: updated }));
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

  const addDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { rating: "", note: "", name: "", designation: "", image: null, image_preview: "" }],
    }));
  };

  const removeDetail = (index) => {
    const updated = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, details: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("heading", formData.heading);
    if (formData.cover_image) formPayload.append("cover_image", formData.cover_image);

    const detailsData = formData.details.map(({ image, image_preview, ...rest }) => rest);
    formPayload.append("details", JSON.stringify(detailsData));

    formData.details.forEach((d) => {
      if (d.image) formPayload.append("details_image", d.image);
    });

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving testimonials section:", err);
      alert("Failed to save testimonials section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Client Testimonial Section</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleFieldChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleFieldChange} />
        </label>
        <label className={styles.fullWidth}>Cover Image
          <input type="file" accept="image/*" onChange={handleCoverImageChange} />
          {formData.cover_image_preview && (
            <img src={formData.cover_image_preview} alt="cover preview" className={styles.inlinePreviewLarge} />
          )}
        </label>
        <div className={styles.fullWidth}>
          <h3>Details</h3>
          {formData.details.map((detail, idx) => (
            <div key={idx} className={styles.cardBoxSmall}>
              <label>Rating
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={detail.rating}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
              <label>Note
                <input
                  type="text"
                  name="note"
                  value={detail.note}
                  onChange={(e) => handleDetailChange(idx, e)}
                />
              </label>
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
              <label className={styles.fullWidth}>Image
                <input type="file" accept="image/*" onChange={(e) => handleDetailImageChange(idx, e)} />
                {detail.image_preview && (
                  <img src={detail.image_preview} alt="preview" className={styles.inlinePreviewLarge} />
                )}
              </label>
              <button type="button" onClick={() => removeDetail(idx)} className={styles.iconDeleteBtn}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addDetail} className={styles.addBtn}>+ Add Testimonial</button>
        </div>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default Testimonials;