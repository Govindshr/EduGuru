// src/admin/pages/Partners.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import PartnerModal from "../components/PartnerModal";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: "", logo: null, logoPreview: "" });

  const fetchPartners = async () => {
    try {
      const res = await axios.post(config.GetAllPartners);
      const data = res.data?.data || [];
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleAddPartner = async () => {
    const formPayload = new FormData();
    formPayload.append("partner_name", newPartner.name);

    if (newPartner.logo && newPartner.logo.name) {
      formPayload.append("partner_logo", newPartner.logo);
    }

    try {
      const res = await axios.post(config.SavePartner, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      fetchPartners();
      setNewPartner({ name: "", logo: null, logoPreview: "" });
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving partner:", error);
      alert("Failed to save partner");
    }
  };

  const handleDeletePartner = async (partner_id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.post(config.DeletePartner, { partner_id });
        Swal.fire("Deleted!", res.data.message, "success");
        fetchPartners();
      } catch (error) {
        console.error("Error deleting partner:", error);
        Swal.fire("Error", "Failed to delete partner", "error");
      }
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Our Clients</h2>
        <button onClick={() => setModalOpen(true)} className={styles.addBtn}>Add Partner</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Logo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner, index) => (
            <tr key={index}>
              <td>{partner.partner_name}</td>
              <td>
                {partner.partner_logo ? (
                  <img src={`${config.imageurl}/${partner.partner_logo.replace(/\\/g, '/')}`} alt="logo" className={styles.inlinePreview} />
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <a onClick={() => handleDeletePartner(partner._id)} style={{cursor:'pointer'}}>
                  <Trash2 size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PartnerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddPartner}
        formData={newPartner}
        setFormData={setNewPartner}
      />
    </div>
  );
};

export default Partners;
