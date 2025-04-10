// src/admin/pages/ShowServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const ShowServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const res = await axios.get(config.GetAllServices);
      setServices(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>All Services</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Heading</th>
            <th>Subhead</th>
            <th>Icon</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.name}</td>
              <td>{service.heading}</td>
              <td>{service.subhead || "N/A"}</td>
              <td>
                {service.icon && (
                  <img src={`${config.imageurl}/${service.icon}`} width={40} height={40} alt="icon" />
                )}
              </td>
              <td>
                {service.image && (
                  <img src={`${config.imageurl}/${service.image}`} width={60} height={60} alt="image" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowServices;
