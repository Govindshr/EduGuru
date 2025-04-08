// src/admin/pages/Queries.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../services/config";
import styles from "../styles/Admin.module.css";

const Queries = () => {
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    try {
      const res = await axios.post(config.GetAllQueries);
      const data = res.data?.data || [];
      setQueries(data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className={styles.formWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Queries</h2>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, index) => (
            <tr key={index}>
              <td>{query.name}</td>
              <td>{query.phone_number}</td>
              <td>{query.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Queries;
