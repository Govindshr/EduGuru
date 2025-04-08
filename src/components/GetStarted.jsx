import React, { useState, useEffect ,useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
function GetStarted() {
  const headingRef = useRef(null);
  const [formData, setFormData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "get_started",
        });
        const data = res.data?.data;

        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching testimonials section:", err);
      }
    };
    fetchData();
  }, []);
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
      <section className="getstarted">
        <div className="container">
          <div className="section-heading pb-4">
            <span>{formData?.title}</span>
            {/* Build a Brand,<br /> Create Value! */}
            <h2 ref={headingRef} className="text-white split-text"> {formData?.heading}</h2>
          </div>
          <figure className="mb-4">
            <img src={`${config.imageurl}/${formData?.image}`} alt="Get Started" />
          </figure>
          <p>
          {formData?.description}
          </p>
        </div>
      </section>
    );
  }
  
  export default GetStarted;
  