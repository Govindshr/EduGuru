// src/admin/pages/CorporateForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const CorporateForm = () => {
  const [formData, setFormData] = useState({
    section_name: "who_we_are",
    title: "",
    heading: "",
    main_description:"",
    description: "",
    image: null,
    image_preview: "",
    corporate_identity: {
      corporate_text: "",
      description: "",
      vision_title: "",
      vision_description: "",
      mission_title: "",
      mission_description: "",
      management_title: "",
      management_description: "",
    },
    why_you_need: {
      text: "",
      why_description: "",
      image: null,
      image_preview: "",
      reasons: [""]
    },
    outsourcing: {
        text: "",
        description: "",
        details: [{ texts: "", image: null, image_preview: "" }]
      }
  });
const handleVisionChange = (value) => {
  setFormData((prev) => ({
    ...prev,
    corporate_identity: {
      ...prev.corporate_identity,
      vision_description: value,
    },
  }));
};

const handleMissionChange = (value) => {
  setFormData((prev) => ({
    ...prev,
    corporate_identity: {
      ...prev.corporate_identity,
      mission_description: value,
    },
  }));
};

const handleManagementChange = (value) => {
  setFormData((prev) => ({
    ...prev,
    corporate_identity: {
      ...prev.corporate_identity,
      management_description: value,
    },
  }));
};

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetWhoWeAre, {
          section_name: formData.section_name,
        });
        const data = res.data?.data;
console.log(data)
        if (data) {
          setFormData((prev) => ({
            ...prev,
            ...data,
            image_preview: data.image ? `${config.imageurl}/${data.image.replace(/\\/g, "/")}` : "",
            why_you_need: {
              ...prev.why_you_need,
              ...data.why_you_need,
              image_preview: data.why_you_need?.image ? `${config.imageurl}/${data.why_you_need.image.replace(/\\/g, "/")}` : ""
            }
          }));
       
      
        }
      } catch (err) {
        console.error("Error fetching section:", err);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.corporate_identity) {
      setFormData((prev) => ({
        ...prev,
        corporate_identity: {
          ...prev.corporate_identity,
          [name]: value,
        },
      }));
    } else if (name in formData.why_you_need) {
      setFormData((prev) => ({
        ...prev,
        why_you_need: {
          ...prev.why_you_need,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleWhyImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      why_you_need: {
        ...prev.why_you_need,
        image: file,
        image_preview: URL.createObjectURL(file),
      }
    }));
  };

  const handleAddReason = () => {
    setFormData((prev) => ({
      ...prev,
      why_you_need: {
        ...prev.why_you_need,
        reasons: [...prev.why_you_need.reasons, ""]
      }
    }));
  };

  const handleRemoveReason = (index) => {
    const updated = formData.why_you_need.reasons.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      why_you_need: {
        ...prev.why_you_need,
        reasons: updated
      }
    }));
  };

  const handleReasonChange = (index, value) => {
    const updated = [...formData.why_you_need.reasons];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      why_you_need: {
        ...prev.why_you_need,
        reasons: updated
      }
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formPayload = new FormData();

  formPayload.append("section_name", formData.section_name);
  formPayload.append("title", formData.title);
  formPayload.append("heading", formData.heading);
  formPayload.append("main_description", formData.main_description);

  if (formData.image instanceof File) {
    formPayload.append("cover_image", formData.image);
  } else if (formData.cover_image) {
    formPayload.append("cover_image", formData.cover_image);
  }

  if (formData.why_you_need.image instanceof File) {
    formPayload.append("image", formData.why_you_need.image);
  } else if (formData.why_you_need.image) {
    formPayload.append("image", formData.why_you_need.image);
  }

  formPayload.append(
    "corporate_identity",
    JSON.stringify(formData.corporate_identity)
  );

  formPayload.append(
    "why_you_need",
    JSON.stringify({
      ...formData.why_you_need,
      image: undefined,
      image_preview: undefined,
    })
  );

  formPayload.append("outsourcing", JSON.stringify(formData.outsourcing));

  const imageIndexMap = [];
  formData.outsourcing.details.forEach((item, index) => {
    if (item.image instanceof File) {
      formPayload.append("details_image", item.image);
      imageIndexMap.push(index);
    }
  });

  formPayload.append("details_image_index_map", JSON.stringify(imageIndexMap));

  try {
    const res = await axios.post(config.SaveOrUpdateWhoWeAre, formPayload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(res.data.message);
  } catch (err) {
    console.error("Error saving section:", err);
    alert("Failed to save section");
  }
};

  const handleOutsourcingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      outsourcing: {
        ...prev.outsourcing,
        [name]: value
      }
    }));
  };

  const handleOutsourcingDetailChange = (index, key, value) => {
    const updated = [...formData.outsourcing.details];
    updated[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      outsourcing: {
        ...prev.outsourcing,
        details: updated
      }
    }));
  };

  const handleOutsourcingImageChange = (index, file) => {
    const updated = [...formData.outsourcing.details];
    updated[index].image = file;
    updated[index].image_preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      outsourcing: {
        ...prev.outsourcing,
        details: updated
      }
    }));
  };

  const handleAddOutsourcingDetail = () => {
    setFormData((prev) => ({
      ...prev,
      outsourcing: {
        ...prev.outsourcing,
        details: [...prev.outsourcing.details, { texts: "", image: null, image_preview: "" }]
      }
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
  

  const handleRemoveOutsourcingDetail = (index) => {
    const updated = formData.outsourcing.details.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      outsourcing: {
        ...prev.outsourcing,
        details: updated
      }
    }));
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Corporate Identity</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid2Col} encType="multipart/form-data">
        <label>Title
          <input type="text" name="title" value={formData.title} onChange={handleFieldChange} />
        </label>
        <label>Heading
          <input type="text" name="heading" value={formData.heading} onChange={handleFieldChange} />
        </label>
        <label>Main Description
          <textarea name="main_description" value={formData.main_description} onChange={handleFieldChange} />
        </label>
        <label>Image
  <input type="file" onChange={handleImageChange} />
  {formData.cover_image && (
    <img src={`${config.imageurl}/${formData.cover_image}`} alt="preview" className={styles.inlinePreview} />
  )}
</label>


        <h3 className={styles.fullWidth}>Corporate Identity</h3>
        <label>Text
          <input type="text" name="corporate_text" value={formData.corporate_identity.corporate_text} onChange={handleFieldChange} />
        </label>
        <label>Description
          <textarea name="description" value={formData.corporate_identity.description} onChange={handleFieldChange} />
        </label>
        <label>Vision Title
          <input type="text" name="vision_title" value={formData.corporate_identity.vision_title} onChange={handleFieldChange} />
        </label>
       <label className={styles.fullWidth}>
  Vision Description
  <ReactQuill
    theme="snow"
    value={formData.corporate_identity.vision_description}
    onChange={handleVisionChange}
    style={{ backgroundColor: "#fff" }}
  />
</label>



        <label>Mission Title
          <input type="text" name="mission_title" value={formData.corporate_identity.mission_title} onChange={handleFieldChange} />
        </label>
       <label className={styles.fullWidth}>
  Mission Description
  <ReactQuill
    theme="snow"
    value={formData.corporate_identity.mission_description}
    onChange={handleMissionChange}
    style={{ backgroundColor: "#fff" }}
  />
</label>


        <label>Management Title
          <input type="text" name="management_title" value={formData.corporate_identity.management_title} onChange={handleFieldChange} />
        </label>
        <label className={styles.fullWidth}>
  Management Description
  <ReactQuill
    theme="snow"
    value={formData.corporate_identity.management_description}
    onChange={handleManagementChange}
    style={{ backgroundColor: "#fff" }}
  />
</label>



        <h3 className={styles.fullWidth}>Why You Need</h3>
        <label>Text
          <input type="text" name="text" value={formData.why_you_need.text} onChange={handleFieldChange} />
        </label>
        <label>Description
          <textarea name="why_description" value={formData.why_you_need.why_description} onChange={handleFieldChange} />
        </label>
        <label>Image
          <input type="file" onChange={handleWhyImageChange} />
          {formData.why_you_need.image_preview && <img src={formData.why_you_need.image_preview} alt="preview" className={styles.inlinePreview} />}
        </label>

        <div className={styles.fullWidth}>
          <h4>Reasons</h4>
          {formData.why_you_need.reasons.map((reason, index) => (
            <div key={index} className={styles.flexRowBetween}>
              <input
                type="text"
                value={reason}
                style={{marginBottom:"20px"}}
                onChange={(e) => handleReasonChange(index, e.target.value)}
              />
             <button
  type="button"
  onClick={() => handleRemoveReason(index)}
  style={{
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    transition: 'background-color 0.3s ease',
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d9363e')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4d4f')}
>
  Remove
</button>

            </div>
          ))}
          <button type="button"  className={styles.addBtn} onClick={handleAddReason}>+ Add Reason</button>
        </div>

      
      
      <h3 className={styles.fullWidth}>Outsourcing</h3>
      <label>Text
        <input type="text" name="text" value={formData.outsourcing.text} onChange={handleOutsourcingChange} />
      </label>
      <label>Description
        <textarea name="description" value={formData.outsourcing.description} onChange={handleOutsourcingChange} />
      </label>
      <div className={styles.fullWidth}>
        <h4>Details</h4>
        {formData.outsourcing.details.map((detail, index) => (
          <div key={index} className={styles.cardBoxSmall}>
            <label>Text
              <input
                type="text"
                value={detail.texts}
                onChange={(e) => handleOutsourcingDetailChange(index, "texts", e.target.value)}
              />
            </label>
            <label>Image
              <input
                type="file"
                onChange={(e) => handleOutsourcingImageChange(index, e.target.files[0])}
              />
              {detail.image && <img src={`${config.imageurl}/${detail.image}`} alt="preview" className={styles.inlinePreview} />}
            </label>
            <button type="button" onClick={() => handleRemoveOutsourcingDetail(index)} className={styles.iconDeleteBtn}>Remove</button>
           
          </div>
        ))}
        <button type="button"  className={styles.addBtn} onClick={handleAddOutsourcingDetail}>+ Add Detail</button>
      </div>

      <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Submit</button>
      </form>
    </div>
  );
};

export default CorporateForm;