import React, { useEffect, useRef } from 'react';
import { config } from '../admin/services/config';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function AreaOfFunction({ data }) {
  const headingRef = useRef(null);

  useEffect(() => {
    if (!data?.area_heading || !headingRef.current) return;

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
    }, 200); // Delay to ensure scrollTop lock

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <section className="areaOfFunction">
      <div className="container">
        <div className="section-heading pb-3 text-start">
          <h2 ref={headingRef} className="mw-100 mb-0 split-text">{data?.area_heading}</h2>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="text-start">
              <p dangerouslySetInnerHTML={{ __html: data?.area_description || "" }} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex functionImg gap-3">
              <figure className="img1">
                <img src={`${config.imageurl}/${data?.area_images[0]}`} alt="Function 1" />
              </figure>
              <div className="img2">
                <p>{data?.area_text}</p>
                <figure className="mt-3">
                  <img src={`${config.imageurl}/${data?.area_images[1]}`} alt="Function 2" />
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
