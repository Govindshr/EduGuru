// src/admin/pages/AddService.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const AddService = () => {
  const navigate = useNavigate(); // ⬅️ step 1
  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    description: "", // ✅ new field
    area_heading: "",
    area_description: "",
    area_text: "",
    area_images: [],
    type: "",
    icon: null,
    image: null,
    icon_preview: "",
    image_preview: "",
  });

const handleDescriptionChange = (value) => {
  setFormData((prev) => ({ ...prev, description: value }));
};

const handleAreaDescriptionChange = (value) => {
  setFormData((prev) => ({ ...prev, area_description: value }));
};

  
  
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
    payload.append("name", formData.name);
    payload.append("heading", formData.heading);
    payload.append("description", formData.description);
    payload.append("area_heading",formData.area_heading);
    payload.append("area_description",formData.area_description);
    payload.append("area_text",formData.area_text);
    payload.append("type", formData.type);
    if (formData.icon) payload.append("icon", formData.icon);
    if (formData.image) payload.append("image", formData.image);
    formData.area_images.forEach((file) => {
      payload.append("area_images", file);
    });
console.log("formdata description",formData.description)
    try {
      const res = await axios.post(config.AddServices, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/admin/services-list"); // ⬅️ step 3
    } catch (err) {
      console.error("Error submitting service:", err);
      alert("Submission failed");
    }
  };

  const handleAreaImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      area_images: files,
    }));
  };


  return (
    <div className={styles.formWrapper}>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Name 
          <input type="text" name="name" value={formData.name} onChange={handleChange}  />
        </label>
        <label>Heading 
          <input type="text" name="heading" value={formData.heading} onChange={handleChange}  />
        </label>
        <label className={styles.fullWidth}>
  Description
  <ReactQuill
    theme="snow"
    value={formData.description}
    onChange={handleDescriptionChange}
    style={{ backgroundColor: "#fff" }}
  />
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
            {formData.icon_preview && <img src={formData.icon_preview} className={styles.inlinePreview} alt="Icon preview" />}
          </label>
        )}

        <label>Image
          <input type="file" onChange={(e) => handleFileChange("image", e)} />
          {formData.image_preview && <img src={formData.image_preview} className={styles.inlinePreview} alt="Image preview" />}
        </label>

          <label>Area Of Function Heading
                  <input type="text" name="area_heading" value={formData.area_heading} onChange={handleChange} />
                </label>

                <label>Area Of Function Right Top Text
                  <input type="text" name="area_text" value={formData.area_text} onChange={handleChange} />
                </label>

             <label className={styles.fullWidth}>
  Area Of Function Description
  <ReactQuill
    theme="snow"
    value={formData.area_description}
    onChange={handleAreaDescriptionChange}
    style={{ backgroundColor: "#fff" }}
  />
</label>



               
              
                <label className={styles.fullWidth}>Area Images
                  <input type="file" multiple onChange={handleAreaImagesChange} />
                </label>

        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default AddService;

/* {submittedDescription && (
  <div className={styles.previewBox}>
    <h3>Live Preview of Description</h3>
    <div
      className={styles.richPreview}
      dangerouslySetInnerHTML={{ __html: submittedDescription }}
    />
  </div>
)} */