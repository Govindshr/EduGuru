// DetailsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../admin/services/config";
import Header2 from "../components/Header2";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import InnerBanner from "../components/InnerBanner";
import MarketingSection from "../components/MarketingSection";
import ProcessSection from "../components/ProcessSection";
import AreaOfFunction from "../components/AreaofFuntion";
import { useLocation } from "react-router-dom";
import { useRef } from 'react';

function DetailsPage() {
  const footerRef = useRef(null);
   const { id } = useParams();
  const location = useLocation();
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [data, setData] = useState(null);



  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.post(config.GetServicesById, { id });
    
        console.log("aa gya ana service data",res.data.data)
        setData(res.data?.data);
      } catch (err) {
        console.error("Error fetching service details:", err);
        alert("Failed to load service details");
      }
    };
    if (id) fetchDetails();
  }, [id]);

  
  const scrollToFooter = () => {
   
    footerRef.current?.scrollIntoView({ behavior: 'instant' });
  };
  useEffect(() => {
    window.history.scrollRestoration = "manual"; // Disable browser native restoration
    window.scrollTo({ top: 0, behavior: "instant" }); // No animation
  }, []);
  

  return (
    <>
      <Header2 onContactClick={scrollToFooter}  />
      <InnerBanner  data={data} />
      <MarketingSection  data={data} onContactClick={scrollToFooter} />
      <ProcessSection />
      {/* <AreaOfFunction data={data}/> */}
      <Footer ref={footerRef} />
    </>
  );
}

export default DetailsPage;
