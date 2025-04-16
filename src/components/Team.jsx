import React, { useState, useEffect ,useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
function Team() {
  const [formData, setFormData] = useState()
  const headingRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "our_team",
        });
        const data = res.data?.data;
        if (data) {
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
      <section className="ourTeam">
        <div className="container">
          <div className="section-heading d-lg-flex justify-content-between align-items-center text-start">
            <div>
              <span>{formData?.title}</span>
              <h2 ref={headingRef} className="text-white split-text">{formData?.heading}</h2>
            </div>
            <p className="px-lg-5 text-white-50">
            {formData?.description} </p>
            <a href="" className="text-white text-nowrap">
              <u> </u>
            </a>
          </div>
          <div className="row">
            {formData?.details.map((member, idx) => (
              <div className="col-md-6 col-lg-3 mb-3" key={idx}>
                <div className="teamContent">
                  <figure>
                    <img src={`${config.imageurl}/${member.image}`} alt={member.name} />
                    <div className="teamSocial">
                      <a href={member?.twitter}>
                        <img src="/images/twitter.svg" alt="Twitter" />
                      </a>
                      <a href={member?.linkedin_link}>
                        <img src="/images/linkedin.svg" alt="LinkedIn" />
                      </a>
                    </div>
                  </figure>
                  <h3>{member.name}</h3>
                  <p>{member.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Team;
  