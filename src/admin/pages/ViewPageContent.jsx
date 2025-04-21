// src/admin/pages/ViewPageContent.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const ViewPageContent = () => {
  const { id } = useParams();
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.post(config.GetPageContentById, { id });
        setPageContent(res.data?.data[0]);
      } catch (err) {
        console.error("Error fetching page content:", err);
      }
    };

    fetchContent();
  }, [id]);

  if (!pageContent) return <p>Loading...</p>;

  return (
    <div className={styles.formWrapper}>
      <h2>Page Content Details</h2>
      <div className={styles.cardBoxSmall}>
        {/* <p><strong>Category:</strong> {pageContent?.category_id?.name}</p> */}
        <p><strong>Heading:</strong> {pageContent.heading}</p>
        <p><strong>Description:</strong> <div
      className={styles.richPreview}
      dangerouslySetInnerHTML={{ __html: pageContent.description }}
    /></p>
        {pageContent.image && (
          <div>
            <strong>Image:</strong><br />
            <img src={`${config.imageurl}/${pageContent.image}`} height={50} width={50} alt="preview"  />
          </div>
        )}
        {/* <hr />
        <h3>Area Details</h3> */}
        {/* <p><strong>Area Heading:</strong> {pageContent.area_heading}</p>
        <p><strong>Area Description:</strong> {pageContent.area_description}</p>
        <p><strong>Area Text:</strong> {pageContent.area_text}</p> */}

        {/* <div>
          <strong>Area Images:</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: 10 }}>
            {pageContent.area_images?.map((img, idx) => (
              <img
                key={idx}
                src={`${config.imageurl}/${img}`}
                alt={`Area ${idx}`}
                width={100}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ViewPageContent;
