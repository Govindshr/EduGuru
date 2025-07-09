// src/admin/pages/EditPageContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPageContent = () => {
  const navigate = useNavigate();
  const [showContactButton, setShowContactButton] = useState(false); // <-- NEW
  const { id } = useParams();
  const [descriptionLoaded, setDescriptionLoaded] = useState(false);

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
     contact_us_enabled: false, // <-- NEW
  contact_us_label: "",      // <-- NEW
  });
const handleDescriptionChange = (value) => {
  setFormData((prev) => ({
    ...prev,
    description: value,
  }));
};

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [servicesRes, contentRes] = await Promise.all([
          axios.post(config.GetAllServices),
          axios.post(config.GetPageContentById, { id }),
        ]);

        setCategories(servicesRes.data?.data || []);

        console.log("2", contentRes.data.data);

        const data = contentRes.data.data[0];
        setFormData({
          category_id: data.category_id,
          heading: data.heading,
          description: data.description,
          image: null,
          image_preview: data.image || "",
          area_heading: data.area_heading,
          area_description: data.area_description,
          area_images: [], 
          area_text: data.area_text,
          area_button: data.area_button,
          area_route: data.area_route,
          contact_us_enabled: data.contact_us_enabled || false,
  contact_us_label: data.contact_us_label || "",
        });
        setShowContactButton(data.contact_us_enabled); // <-- NEW
      


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

  const handleCheckboxChange = (e) => {
  const checked = e.target.checked;
  setShowContactButton(checked);
  setFormData((prev) => ({
    ...prev,
    contact_us_enabled: checked,
    contact_us_label: checked ? prev.contact_us_label : "",
  }));
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
    payload.append("contact_us_enabled", formData.contact_us_enabled);
payload.append("contact_us_label", formData.contact_us_label);


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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Edit Page Content </h2>
        <button
          className={styles.addBtn}
          onClick={() => navigate("/admin/page-content-list")}
        >
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={styles.formGrid2Col}
        encType="multipart/form-data"
      >
        <label>
          Service
          <select
            name="category_id"
            className="form-control"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Name
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
          />
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



        <label className={styles.fullWidth}>
          Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image_preview && (
            <img
              src={
                formData.image_preview.startsWith("blob:")
                  ? formData.image_preview
                  : `${config.imageurl}/${formData.image_preview}`
              }
              alt="preview"
              className={styles.inlinePreviewLarge}
            />
          )}
        </label>

        <div className={styles.fullWidth} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '10px' }}>
  <input
    type="checkbox"
    id="enableContact"
    checked={showContactButton}
    onChange={handleCheckboxChange}
  />
  <label htmlFor="enableContact" style={{ margin: 0 }}>Enable Contact Us Button</label>
</div>

{showContactButton && (
  <label className={styles.fullWidth}>
    Contact Button Label
    <input
      type="text"
      name="contact_us_label"
      value={formData.contact_us_label}
      onChange={handleChange}
    />
  </label>
)}


        

        <button
          type="submit"
          className={`${styles.submitBtn} ${styles.fullWidth}`}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPageContent;
