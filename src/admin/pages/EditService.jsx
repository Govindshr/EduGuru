// src/admin/pages/EditService.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [previewAreaImages, setPreviewAreaImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    description: "",
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

  const descriptionEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  const areaDescriptionEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, area_description: editor.getHTML() }));
    },
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.post(config.GetServicesById, { id });
        const data = res.data.data;
        setFormData({
          name: data.name,
          heading: data.heading,
          description: data.description,
          area_heading: data.area_heading,
          area_description: data.area_description,
          area_text: data.area_text,
          type: data.type,
          icon: null,
          area_images: [],
          image: null,
          icon_preview: data.icon || "",
          image_preview: data.image || "",
        });
        setPreviewAreaImages(data.area_images || []);

        descriptionEditor?.commands.setContent(data.description || "");
        areaDescriptionEditor?.commands.setContent(data.area_description || "");
      } catch (err) {
        console.error("Error fetching service:", err);
        alert("Failed to load service data");
      }
    };

    fetchService();
  }, [id, descriptionEditor, areaDescriptionEditor]);

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
    payload.append("id", id);
    payload.append("name", formData.name);
    payload.append("heading", formData.heading);
    payload.append("description", formData.description);
    payload.append("area_heading", formData.area_heading);
    payload.append("area_description", formData.area_description);
    payload.append("area_text", formData.area_text);
    payload.append("type", formData.type);

    if (formData.icon) payload.append("icon", formData.icon);
    if (formData.image) payload.append("image", formData.image);
    formData.area_images.forEach((file) => {
      payload.append("area_images", file);
    });

    try {
      const res = await axios.post(config.EditService, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/admin/services-list");
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Update failed");
    }
  };

  const handleAreaImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      area_images: files,
    }));
    setPreviewAreaImages([]);
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Edit Service</h2>
      <form
        onSubmit={handleSubmit}
        className={styles.formGrid2Col}
        encType="multipart/form-data"
      >
        <label>Name *
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Heading *
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} required />
        </label>

        <label className={styles.fullWidth}>
          Description
          <div className={styles.tiptapWrapper} onClick={() => descriptionEditor?.commands.focus()}>
            <EditorContent editor={descriptionEditor} />
          </div>
        </label>

        <label>Type *
          <select name="type" value={formData.type} onChange={handleChange} className={styles.selectDropdown} required>
            <option value="" disabled>Select Type</option>
            <option value="portfolio">Portfolio</option>
            <option value="whatweare">What We Are</option>
          </select>
        </label>

        {formData.type === "whatweare" && (
          <label>
            Icon
            <input type="file" onChange={(e) => handleFileChange("icon", e)} />
            {formData.icon_preview && (
              <img
                src={formData.icon_preview.startsWith("blob:") ? formData.icon_preview : `${config.imageurl}/${formData.icon_preview}`}
                className={styles.inlinePreview}
                alt="Icon preview"
              />
            )}
          </label>
        )}

        <label>Image
          <input type="file" onChange={(e) => handleFileChange("image", e)} />
          {formData.image_preview && (
            <img
              src={formData.image_preview.startsWith("blob:") ? formData.image_preview : `${config.imageurl}/${formData.image_preview}`}
              className={styles.inlinePreview}
              alt="Image preview"
            />
          )}
        </label>

        <label>Area Of Function Heading
          <input type="text" name="area_heading" value={formData.area_heading} onChange={handleChange} />
        </label>

        <label className={styles.fullWidth}>
          Area Of Function Description
          <div className={styles.tiptapWrapper} onClick={() => areaDescriptionEditor?.commands.focus()}>
            <EditorContent editor={areaDescriptionEditor} />
          </div>
        </label>

        <label>Area Of Function Right Top Text
          <input type="text" name="area_text" value={formData.area_text} onChange={handleChange} />
        </label>

        <label className={styles.fullWidth}>
          Area Images
          <input type="file" multiple onChange={handleAreaImagesChange} />
          {previewAreaImages.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {previewAreaImages.map((img, i) => (
                <img
                  key={i}
                  src={`${config.imageurl}/${img}`}
                  alt={`area_img_${i}`}
                  style={{ width: "100px", height: "auto", borderRadius: "6px" }}
                />
              ))}
            </div>
          )}
        </label>

        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditService;
