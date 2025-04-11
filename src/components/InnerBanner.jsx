import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
function InnerBanner() {
   const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const headingRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetBanner, {
          section_name: "banner",
        });
        const data = res.data?.data;

        if (data) {
          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            buttons: data.button || [{ label: "", route: "" }],
            image_preview: data.image
              ? `${config.imageurl}/${data.image.replace(/\\/g, "/")}`
              : "",
          }));
        }
      } catch (err) {
        console.error("Error fetching details banner section:", err);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (!formData?.title || !headingRef.current) return;
  
    let split;
  
    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 80%",
      once: true, // only trigger once
      onEnter: () => {
        split = new SplitType(headingRef.current, { types: "words, chars" });
  
        gsap.from(split.words, {
          opacity: 0,
          x: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
  
        gsap.from(split.chars, {
          opacity: 0,
          x: 80,
          duration: 1.8,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.2,
        });
      },
    });
  
    return () => {
      if (split) split.revert(); // clean up split
      trigger.kill(); // clean up trigger
    };
  }, [formData]);
  
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <section
      className="innerbanner"
      style={{ backgroundImage: `url(${formData?.image_preview})` }}
    >
      <div className="container">
        <div className="innerbannerTxt">
          <h1 ref={headingRef} className="split-text">{formData?.title}</h1>
          <div className="breadcrumbDiv">
            <ol className="breadcrumb mb-0">
              
                <li className="breadcrumb-item">
                  <a  href="" onClick={handleLogoClick}>Home</a>
                </li>
             

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InnerBanner;
