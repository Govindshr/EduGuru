// src/App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import DetailsPage from "./pages/DetailsPage";
import AdminLogin from "./pages/AdminLogin";

// Admin Pages
import AdminLayout from "./admin/layout/AdminLayout";
import MainBanner from "./admin/pages/MainBanner";
import DesignSolution from "./admin/pages/DesignSolution";
import SkillsSection from "./admin/pages/SkillsSection";
import OurTeam from "./admin/pages/OurTeam";
import Portfolio from "./admin/pages/OurPortfolio";
import Testimonials from "./admin/pages/Testimoinal";
import GetStarted from "./admin/pages/GetStarted";
import OurPartner from "./admin/pages/OurPartner";
import Partners from "./admin/pages/OurPartner";
import ContactUs from "./admin/pages/ContactUs";
import Queries from "./admin/pages/Queries";
import CorporateForm from "./admin/pages/WhoWeAre";
import DetailsBanner from "./admin/pages/DetailsBanner";
import Categories from "./admin/pages/Categories";
import PageContent from "./admin/pages/PageContent";
import AllPageContents from "./admin/pages/AllPageContents";
import ViewPageContent from "./admin/pages/ViewPageContent";
import AddServices from "./admin/pages/AddServices";
import ShowServices from "./admin/pages/AllServices";

// Route Protection

import PrivateRoute from "./admin/components/PrivateRoutes";
import EditService from "./admin/pages/EditService";
import EditPageContent from "./admin/pages/EditPagecontent";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/details-page/:id" element={<DetailsPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="main-banner" element={<MainBanner />} />
          <Route path="who-we-are" element={<CorporateForm />} />
          <Route path="design-solution" element={<DesignSolution />} />
          <Route path="skills-section" element={<SkillsSection />} />
          <Route path="our-team" element={<OurTeam />} />
          <Route path="our-portfolio" element={<Portfolio />} />
          <Route path="client-testimonial" element={<Testimonials />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="clients" element={<Partners />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="queries" element={<Queries />} />
          <Route path="details-banner" element={<DetailsBanner />} />
          <Route path="categories" element={<Categories />} />
          <Route path="page-content-add" element={<PageContent />} />
          <Route path="page-content-list" element={<AllPageContents />} />
          <Route path="view-page-content/:id" element={<ViewPageContent />} />
          <Route path="add-services" element={<AddServices />} />
          <Route path="services-list" element={<ShowServices />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="edit-category/:id" element={<EditPageContent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;