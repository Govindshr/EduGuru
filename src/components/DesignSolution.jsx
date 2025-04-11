import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config"; // your existing config file

gsap.registerPlugin(ScrollTrigger);

function DesignSolution( {ref}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [services, setServices] = useState([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "what_we_are",
        });
        setFormData(res.data?.data);
      } catch (err) {
        console.error("Error fetching section:", err);
      }
    };
    fetchData();
    fetchServices()
  }, []);


  const fetchServices = async () => {
    try {
      const res = await axios.post(config.GetAllServices,{type: "whatweare"});
      const reversedData = (res.data?.data || []).reverse();
      setServices(reversedData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  useEffect(() => {
    if (!formData?.heading || !headingRef.current) return;
  
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
  
  
  return (
    <section className="designSolution" ref={ref}>
      <div className="container">
        <div className="section-heading">
          <span>{formData?.title}</span>
          <h2 ref={headingRef} className="text-white split-text">
            {formData?.heading}
          </h2>
      
        </div>
        <div className="solutionContent">
          <div className="row">
            {services?.map((item, index) => (
              <div className="col-md-4 mb-4 px-md-3" key={index}>
                <div className="solutionTxt" onClick={() => navigate(`/details-page/${item?._id}`)} style={{cursor:'pointer'}}>
                  <figure>
                    <img src={`${config.imageurl}/${item.image}`} alt="" />
                    <i className="topIcon">
                      <img src={`${config.imageurl}/${item.icon}`} alt="" />
                    </i>
                  </figure>
                  <h3>{item.name}</h3>
                  <a href="">
                    {item.heading}
                    <img src="/images/arrow-gray.svg" alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignSolution;
