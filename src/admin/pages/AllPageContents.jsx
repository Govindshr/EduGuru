// src/admin/pages/Queries.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../services/config";
import { Trash2, Eye } from "lucide-react";
import styles from "../styles/Admin.module.css";
import { useNavigate } from "react-router-dom";

const AllPageContents = () => {
  const navigate = useNavigate();
  const [allpagecontents, setAllPageContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services ,setServices] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async (category = "") => {
    try {
      const res = await axios.post(config.GetAllPageContents, {
        category_id: category,
      });
      const data = res.data?.data || [];
      setAllPageContents(data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };
  const fetchServices = async () => {
    try {
      const res = await axios.post(config.GetAllServices);
      setServices(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await axios.get(config.GetAllCategories);
      const data = res.data?.data || [];
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.post(config.DeletePageContent, {
          id: partner_id,
        });
        Swal.fire("Deleted!", res.data.message, "success");
        fetchData(selectedCategory);
      } catch (error) {
        console.error("Error deleting partner:", error);
        Swal.fire("Error", "Failed to delete partner", "error");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchServices()
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    fetchData(selected);
  };

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>All Categories</h2>
        <button
          className={styles.addBtn}
          onClick={() => navigate("/admin/page-content-add")}
        >
          + Add 
        </button>
      </div>

      <div style={{ margin: "15px 0" }}>
        <label htmlFor="categoryFilter">Filter by Services: </label>
        <select
  id="categoryFilter"
  value={selectedCategory}
  onChange={handleCategoryChange}
  className={styles.selectDropdown}
>

          <option value="">All</option>
          {services?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
          <th>S.No.</th>
            <th>Heading</th>
            <th>Description</th>
            {/* <th>Category</th> */}
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allpagecontents.map((query, index) => (
            <tr key={index}>
               <td>{index + 1}</td>
              <td>{query.heading}</td>
              <td>{query.description}</td>
              {/* <td>{query?.category_name ? query?.category_name : "N/A"}</td> */}
              <td>
                <img
                  src={`${config.imageurl}/${query.image}`}
                  width={50}
                  height={50}
                />
              </td>
              <td>
                <div className="d-flex">
                  <a
                    className={styles.iconBtn}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/view-page-content/${query._id}`)}
                  >
                    <Eye size={18} />
                  </a>
                  <a
                    onClick={() => handleDeletePartner(query._id)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  >
                    <Trash2 size={18} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPageContents;
