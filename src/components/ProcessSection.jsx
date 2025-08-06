import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function  ProcessSection() {
  const headingRef = useRef(null);
  const steps = [
   {
    title: 'Enquiry',
    description:'Enquire about a product or service, which can be the first step.'
  },
  {
    title: 'Meeting',
    description:'Let’s meet either physically or virtually to discuss.'
  },
  {
    title: 'Analysis',
    description:'Analysis is the process of breaking down information, data, or a situation into smaller parts to understand it better.'
  },
  {
    title: 'Analysis of agreed work areas',
    description:'Examining the specific tasks, responsibilities, or goals that have been agreed upon to ensure clarity, efficiency, and progress.'
  },
  {
    title: 'Pricing & Agreement',
    description:'Setting a price for a product or service and reaching a formal understanding or contract.'
  },
  {
    title: 'Submission of Detailed Plan',
    description:'Formally presenting a well-structured and comprehensive outline of a project, task, or proposal for review, approval, or implementation.'
  },
  {
    title: 'Approval',
    description:'Agreeing to or accepting a plan, proposal, decision, or completed work.'
  },
  {
    title: 'Execution',
    description:'Putting a plan, task, or strategy into action—in other words, it is where actual work gets done based on what was previously discussed or approved.'
  },
  {
    title: 'Monitoring & Optimization',
    description:'Tracking performance and then making improvements to ensure better results or efficiency over time.'
  },
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
    <section className="processSection mb-0">
      <div className="container">
        <div className="section-heading pb-4">
          <h2 ref={headingRef} className="text-white split-text mb-2">Process</h2>
          <p>
            Every process is perfectly designed to get the results it gets.
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
              {steps.map((item, index) => (
                <li key={index}>
                  <div className="d-flex align-items-center gap-4">
                    <span>
                      {String(index + 1).padStart(2, '0')} <b>Step</b>
                    </span>
                    <div>
                      <strong>{item?.title}</strong>
                      <p>
                        {item?.description}
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
