// src/admin/layout/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "../styles/Admin.module.css";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.title}>Admin Panel</div>
        <div className={styles.logo}><img src="/images/logo.svg" width="130" alt="Logo" className={styles.logo} /></div>
      </header>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.menuGroup}>Landing CMS</div>
          <ul>
            <NavLink to="main-banner" className={({ isActive }) => (isActive ? styles.active : "")}><li>Main Banner</li></NavLink>
            <NavLink to="who-we-are" className={({ isActive }) => (isActive ? styles.active : "")}><li>Who We Are</li></NavLink>
            <NavLink to="design-solution" className={({ isActive }) => (isActive ? styles.active : "")}><li>What We Are</li></NavLink>
            <NavLink to="skills-section" className={({ isActive }) => (isActive ? styles.active : "")}><li>Our Skills</li></NavLink>
            <NavLink to="our-team" className={({ isActive }) => (isActive ? styles.active : "")}><li>Our Team</li></NavLink>
            <NavLink to="our-portfolio" className={({ isActive }) => (isActive ? styles.active : "")}><li>Our Portfolio</li></NavLink>
            <NavLink to="client-testimonial" className={({ isActive }) => (isActive ? styles.active : "")}><li>Testimonials</li></NavLink>
            <NavLink to="get-started" className={({ isActive }) => (isActive ? styles.active : "")}><li>Get Started</li></NavLink>
            <NavLink to="clients" className={({ isActive }) => (isActive ? styles.active : "")}><li>Our Clients</li></NavLink>
          </ul>

          <div className={styles.menuGroup}>Details Page </div>
          <ul>
            <NavLink to="details-banner" className={({ isActive }) => (isActive ? styles.active : "")}><li>Details Page-Banner</li></NavLink>
            <NavLink to="categories" className={({ isActive }) => (isActive ? styles.active : "")}><li>Categories</li></NavLink>
            <NavLink to="page-content-list" className={({ isActive }) => (isActive ? styles.active : "")}><li>Page-Content</li></NavLink>
            <NavLink to="page-content-add" className={({ isActive }) => (isActive ? styles.active : "")}><li>Add Page-Content</li></NavLink>
          </ul>

          <div className={styles.menuGroup}>Contact Us </div>
          <ul>
            <NavLink to="contact-us" className={({ isActive }) => (isActive ? styles.active : "")}><li>Conteact Us Section</li></NavLink>
            <NavLink to="queries" className={({ isActive }) => (isActive ? styles.active : "")}><li>Queries</li></NavLink>
            <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Log out</li>
          </ul>
        </aside>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
