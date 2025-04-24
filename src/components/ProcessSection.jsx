import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function ProcessSection() {
  const headingRef = useRef(null);
  const steps = [
    'Enquiry',
    'Meeting',
    'Analysis',
    'Finalizing work areas',
    'Pricing & Agreement',
    'Analysis of agreed work areas',
    'Submission of Detailed Plan',
    'Approval',
    'Execution',
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!headingRef.current) return;

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
    }, 200); // Delay to allow scrollTo(0, 0) to finish

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="processSection">
      <div className="container">
        <div className="section-heading pb-4">
          <h2 ref={headingRef} className="text-white split-text mb-2">Process</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </p>
        </div>

        <div className="row align-items-center">
          <div className="col-md-12 col-lg-4 mb-3">
            <div className="cardMove">
              <span className="ourProcess prcsOne">Our Process</span>
              <span className="ourProcess prcsTwo">Simple, seamless</span>
              <span className="ourProcess prcsThree">Streamlined</span>
            </div>
          </div>

          <div className="col-md-12 col-lg-8 mb-3">
            <ul className="ProcesslistUl">
              {steps.map((title, index) => (
                <li key={index}>
                  <div className="d-flex align-items-center gap-4">
                    <span>
                      {String(index + 1).padStart(2, '0')} <b>Step</b>
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
