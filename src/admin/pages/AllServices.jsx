// src/admin/pages/ShowServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const ShowServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const res = await axios.post(config.GetAllServices);
      setServices(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);



  const handleDeletePartner = async (partner_id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.post(config.DeleteService, {
          id: partner_id,
        });
        Swal.fire("Deleted!", res.data.message, "success");
        fetchServices();
      } catch (error) {
        console.error("Error deleting partner:", error);
        Swal.fire("Error", "Failed to delete partner", "error");
      }
    }
  };

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
            <th>Type</th>
            <th>Icon</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.name}</td>
              <td>{service.heading}</td>
              <td>{service.type || "N/A"}</td>
              <td>
  {service.icon ? (
    <img src={`${config.imageurl}/${service.icon}`} width={40} height={40} alt="icon" />
  ) : (
    service.type === "whatweare" ? "-" : null
  )}
</td>

              <td>
                {service.image && (
                  <img src={`${config.imageurl}/${service.image}`} width={60} height={60} alt="image" />
                )}
              </td>
              <td>
              <a
                    onClick={() => handleDeletePartner(service._id)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  >
                    <Trash2 size={18} />
                  </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowServices;
