import React, { useState, useEffect ,useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
function Skills() {
   const [formData, setFormData] = useState()
    const headingRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name:"our_skills",
        });
        const data = res.data?.data;

        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching skills section:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!formData?.heading || !headingRef.current) return;
  
    const timeout = setTimeout(() => {
      let split;
  
      const trigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
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
        if (split) split.revert();
        trigger.kill();
      };
    }, 200); // ⏱ wait for scrollTo(0, 0)
  
    return () => clearTimeout(timeout);
  }, [formData]);
  
    return (
      <section className="ourSkills">
        <div className="container">
          <div className="section-heading">
            <span>{formData?.title }</span>
            <h2 ref={headingRef} className="split-text">{formData?.heading}</h2>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3 text-center">
              <figure>
                <img src={`${config.imageurl}/${formData?.cover_image}`} alt="" width="400" />
              </figure>
            </div>
            <div className="col-lg-6 mb-3">
              <p>
              {formData?.description}
              </p>
              <div className="row">
                {formData?.details.map((skill, index) => (
                  <div className="col-md-6 mb-3" key={index}>
                    <div className="skillContent">
                      <figure>
                        <img src="/images/skill-icon1.svg" alt="" />
                      </figure>
                      <div className="skilltext">
                        <strong>{skill?.skill_name}</strong>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow={skill?.rating_value}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          
                          <div className="progress-bar" style={{ width: `${skill?.rating_value}%` }}></div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Skills;
  