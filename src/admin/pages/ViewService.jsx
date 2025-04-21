import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const ViewServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.post(config.GetServicesById, { id });
    
        setData(res.data?.data);
      } catch (err) {
        console.error("Error fetching service details:", err);
        alert("Failed to load service details");
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Service Details</h2>
        <button className={styles.addBtn} onClick={() => navigate("/admin/services-list")}>Back</button>
      </div>

      <div className={styles.detailGrid}>
        <p><strong>Service:</strong> {data?.name || "N/A"}</p>
        <p><strong>Heading:</strong> {data?.heading}</p>

         <p><strong>Description:</strong> <div
              className={styles.richPreview}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            /></p>
        {/* <p><strong>Description:</strong> {data?.description}</p> */}

        {data?.image && (
          <div>
            <p><strong>Image:</strong></p>
            <img src={`${config.imageurl}/${data.image}`} alt="Service" className={styles.inlinePreviewLarge} />
          </div>
        )}

        <p><strong>Area Heading:</strong> {data?.area_heading}</p>
        <p><strong>Area Description:</strong> {data?.area_description}</p>
        <p><strong>Right Top Text:</strong> {data?.area_text}</p>
        <p><strong>Button Label:</strong> {data?.area_button}</p>
        <p><strong>Route:</strong> {data?.area_route}</p>

        {data?.area_images?.length > 0 && (
          <div>
            <p><strong>Area Images:</strong></p>
            <div className={styles.multiImagePreview}>
              {data.area_images.map((img, idx) => (
                <img key={idx} src={`${config.imageurl}/${img}`} alt={`area-${idx}`} className={styles.inlinePreviewSmall} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewServiceDetails;
