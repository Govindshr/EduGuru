// DetailsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../admin/services/config";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import InnerBanner from "../components/InnerBanner";
import MarketingSection from "../components/MarketingSection";
import ProcessSection from "../components/ProcessSection";
import AreaOfFunction from "../components/AreaofFuntion";
import { useLocation } from "react-router-dom";
import { useRef } from 'react';

function DetailsPage() {
  const footerRef = useRef(null);
  const location = useLocation();
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  const handleCategorySelect = async (categoryId) => {
   console.log(categoryId)
    try {
      const response = await axios.post(config.GetPageContentById, { id: categoryId });
      console.log("Data from selected category:", response.data);
      setSelectedCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching data for selected category:", error);
    }
  };

  
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  

  return (
    <>
      <Header2 onContactClick={scrollToFooter} />
      <InnerBanner  />
      <MarketingSection onCategorySelect={handleCategorySelect} selectedCategoryData={selectedCategoryData} />
      <ProcessSection />
      <AreaOfFunction  selectedCategoryData={selectedCategoryData}/>
      <Footer ref={footerRef} />
    </>
  );
}

export default DetailsPage;
