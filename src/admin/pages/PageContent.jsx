// src/admin/pages/PageContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const PageContent = () => {
   const navigate = useNavigate();
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
    area_route: ""
  });
  const descriptionEditor = useEditor({
    extensions: [StarterKit],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });
  

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.post(config.GetAllServices);
        setCategories(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
fetchServices()  
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

  const handleAreaImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      area_images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
   
    formPayload.append("category_id", formData.category_id);
    formPayload.append("heading", formData.heading);
    formPayload.append("description", formData.description);
    formPayload.append("area_heading", formData.area_heading);
    formPayload.append("area_description", formData.area_description);
    formPayload.append("area_text", formData.area_text);
    formPayload.append("area_button", formData.area_button);
    formPayload.append("area_route", formData.area_route);

    if (formData.image) formPayload.append("image", formData.image);
    formData.area_images.forEach((file) => {
      formPayload.append("area_images", file);
    });

    try {
      const res = await axios.post(config.SavePageContent, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/admin/page-content-list"); // ⬅️ step 3
    } catch (err) {
      console.error("Error saving page content:", err);
      alert("Failed to save page content");
    }
  };

  return (
    <div className={styles.formWrapper}>
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Add Category Data</h2>
               <button className={styles.addBtn} onClick={() => navigate('/admin/page-content-list')} >Back</button>
            </div>
     
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Service
          <select name="category_id" className="form-control" value={formData.category_id} onChange={handleChange}>
            <option value="">Select Service</option>
            {console.log("categories",categories)}
            {categories?.map((cat) => (
              <option key={cat._id} value={cat?._id}>{cat?.name}</option>
            ))}
          </select>
        </label>
        <label>Name
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
        </label>
        <label className={styles.fullWidth}>
  Description
  <div
    className={styles.tiptapWrapper}
    onClick={() => descriptionEditor?.commands.focus()}
  >
    <EditorContent editor={descriptionEditor} />
  </div>
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

export default PageContent;