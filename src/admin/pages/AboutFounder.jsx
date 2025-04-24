
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const AboutFounder = () => {
  const [formData, setFormData] = useState({
    section_name: "about_founder",
    title: "Big Sale",
    heading: "Save 50%",
    subheading: "On all items",
    profileImage: null,
    profileImagePreview: ""
  });

  // Add before return
const headingEditor = useEditor({
  extensions: [StarterKit],
  content: "",
  onUpdate: ({ editor }) => {
    setFormData((prev) => ({ ...prev, heading: editor.getHTML() }));
  },
});

const subheadingEditor = useEditor({
  extensions: [StarterKit],
  content: "",
  onUpdate: ({ editor }) => {
    setFormData((prev) => ({ ...prev, subheading: editor.getHTML() }));
  },
});

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: formData.section_name,
        });
        const data = res.data?.data;
        if (data) {
          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            // heading: data.heading || "",
            // subheading: data.subheading || "",
            profileImage: null,
            profileImagePreview: data.profile_image ? `${config.imageurl}/${data.profile_image.replace(/\\/g, '/')}` : ""
          }));
          // Inside useEffect after fetch
headingEditor?.commands.setContent(data.heading || "");
subheadingEditor?.commands.setContent(data.subheading || "");
        }
      } catch (err) {
        console.error("Error fetching main banner:", err);
      }
    };
    fetchSection();
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
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("heading", formData.heading);
    formPayload.append("subheading", formData.subheading);
   
    if (formData.profileImage) formPayload.append("profile_image", formData.profileImage);

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving main banner:", err);
      alert("Failed to save main banner section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>About Founder </h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Name
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>Upper Description
  <div className={styles.tiptapWrapper} onClick={() => headingEditor?.commands.focus()}>
    <EditorContent editor={headingEditor} />
  </div>
</label>

<label>Lower Description
  <div className={styles.tiptapWrapper} onClick={() => subheadingEditor?.commands.focus()}>
    <EditorContent editor={subheadingEditor} />
  </div>
</label>

       
        <label>Profile Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <div className={`${styles.imagePreview} ${styles.fullWidth}`}>
          {formData.profileImagePreview && (
            <img src={formData.profileImagePreview} alt="Preview" />
          )}
        </div>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default AboutFounder;