import React from 'react';
import { useEffect,useRef,useState } from 'react';
import { config } from '../admin/services/config';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
function AreaOfFunction({selectedCategoryData}) {
  const headingRef = useRef(null);


  useEffect(() => {
    if (!selectedCategoryData?.data?.heading || !headingRef.current) return;
  
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
  }, [selectedCategoryData?.data]);
  

  return (
    <section className="areaOfFunction">
      <div className="container">
        <div className="section-heading pb-3 text-start">
          <h2 ref={headingRef} className="mw-100 mb-0 split-text">{selectedCategoryData?.data?.area_heading}</h2>
        </div>
        <div className="row">
          {/* Left column - Text content */}
          <div className="col-lg-6">
            <div className="text-start">
            
                
                  <p>{selectedCategoryData?.data?.area_description}</p>
               
           
            </div>
          </div>

          {/* Right column - Images and CTA */}
          <div className="col-lg-6">
            <div className="d-flex functionImg gap-3">
              <figure className="img1">
                <img src={`${config.imageurl}/${selectedCategoryData?.data?.area_images[0]}`} alt="Function 1" />
              </figure>
              <div className="img2">
                <p>
                {selectedCategoryData?.data?.area_text}
                </p>
                <a href={selectedCategoryData?.data?.area_route} className="btn btn-success px-3 mh-auto">
                {selectedCategoryData?.data?.area_button}
                  <img className="ms-2" src="images/arrow-white.svg" alt="Arrow" width="20" />
                </a>
                <figure className="mt-3">
                  <img src={`${config.imageurl}/${selectedCategoryData?.data?.area_images[1]}`} alt="Function 2" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AreaOfFunction;
