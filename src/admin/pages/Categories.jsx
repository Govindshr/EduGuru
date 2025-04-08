// src/admin/pages/Categories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.post(config.GetAllCategories);
      const data = res.data?.data || [];
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async () => {
    try {
      const res = await axios.post(config.SaveCategory, { name: newCategory });
      alert(res.data.message);
      setModalOpen(false);
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
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
        const res = await axios.post(config.DeleteCategory, { id:partner_id });
        Swal.fire("Deleted!", res.data.message, "success");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting partner:", error);
        Swal.fire("Error", "Failed to delete partner", "error");
      }
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Categories</h2>
        <button className={styles.addBtn} onClick={() => setModalOpen(true)}>+ Add Category</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <a onClick={() => handleDeletePartner(category._id)} style={{cursor:'pointer'}}>
                  <Trash2 size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className={styles.fullWidth}
            />
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
              <button className={styles.closeModal} onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleSaveCategory}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
