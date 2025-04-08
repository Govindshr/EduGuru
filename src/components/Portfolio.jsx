import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";

function Portfolio() {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const [formData, setFormData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "our_portfolio",
        });
        const data = res.data?.data;
        if (data) {
          // Ensure it's sorted linearly by some property like `id` or use index order
          data.details = [...data.details]; // Copy array to avoid mutation
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching team section:", err);
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
    <section className="portfolioSection">
      <div className="container">
        <div className="section-heading">
          <span>{formData?.title}</span>
          <h2 ref={headingRef} className="split-text">
            {formData?.heading}
          </h2>
        </div>
        <div className="portfolioList">
          {formData &&
            [
              ...formData.details.filter((_, i) => i % 2 === 0),
              ...formData.details.filter((_, i) => i % 2 !== 0),
            ].map((item, idx) => (
              <div className="portfolioContent" key={idx} onClick={() => navigate('/details-page')} style={{cursor:'pointer'}}>
                <figure>
                  <img
                    src={`${config.imageurl}/${item.image}`}
                    alt={item.title}
                  />
                </figure>
                <a href={item?.button_link} className="portfolioTxt">
                  <h3>
                    <b>{item.title}</b> {item.heading}
                  </h3>
                  <span>
                    <img src="/images/arrow-white.svg" alt="Arrow" />
                  </span>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
