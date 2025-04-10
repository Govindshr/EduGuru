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


function DetailsPage() {
   
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

  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  

  return (
    <>
      <Header2 />
      <InnerBanner />
      <MarketingSection onCategorySelect={handleCategorySelect} selectedCategoryData={selectedCategoryData} />
      <ProcessSection />
      <AreaOfFunction  selectedCategoryData={selectedCategoryData}/>
      <Footer />
    </>
  );
}

export default DetailsPage;
