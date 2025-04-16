// src/admin/pages/ContactUs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    section_name: "contact_us",
    title: "Get in Touch",
    heading: "We’d love to hear from you",
    email:'example@gmail.com',
    mobile_number:9899899909,
    fb_link:"fb",
    linkedin_link:"linkedin",
    twitter_link:"tw",
    insta_link:"insta",
    description: "Fill out the form and our team will get back to you shortly.",
    image: null,
    image_preview: ""
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
            heading: data.heading || "",
            email:data.email || "",
            mobile_number:data.mobile_number || 9999999999,
            fb_link:data.fb_link || "fb",
            linkedin_link:data.linkedin_link || 'linkedin_link',
            twitter_link :data.twitter_link || 'tw',
            insta_link:data.insta_link || "insta",
            description: data.description || "",
            image: null,
            image_preview: data.image ? `${config.imageurl}/${data.image.replace(/\\/g, '/')}` : ""
          }));
        }
      } catch (err) {
        console.error("Error fetching contact us section:", err);
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
        image: file,
        image_preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    formPayload.append("section_name", formData.section_name);
    formPayload.append("title", formData.title);
    formPayload.append("heading", formData.heading);
    formPayload.append("fb_link", formData.fb_link);
    formPayload.append("linkedin_link",formData.linkedin_link)
    formPayload.append("twitter_link",formData.twitter_link);
    formPayload.append("insta_link", formData.insta_link);
    formPayload.append("email", formData.email);
    formPayload.append("mobile_number",formData.mobile_number)
    formPayload.append("description", formData.description);
    if (formData.image) formPayload.append("image", formData.image);

    try {
      const res = await axios.post(config.UpdateWhatWeAre, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving contact us section:", err);
      alert("Failed to save contact us section");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Contact Us Section</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
        </label>
        <label className={styles.fullWidth}>Description
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label className={styles.fullWidth}>Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image_preview && (
            <img src={formData.image_preview} alt="preview" className={styles.inlinePreviewLarge} />
          )}
        </label>

        <h2>Footer Details</h2>
        <h2></h2>
        <label>Email
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>Mobile Number
          <input type="number" name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
        </label>
        <label>Facebook Link
          <input type="text" name="fb_link" value={formData.fb_link} onChange={handleChange} />
        </label>
        <label>Instagram Link
          <input type="text" name="insta_link" value={formData.insta_link} onChange={handleChange} />
        </label>
        <label>Twitter Link
          <input type="text" name="twitter_link" value={formData.twitter_link} onChange={handleChange} />
        </label>
        <label>Linkedin Link
          <input type="text" name="linkedin_link" value={formData.linkedin_link} onChange={handleChange} />
        </label>
        <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
