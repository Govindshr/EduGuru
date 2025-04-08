import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
import { config } from "../admin/services/config";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Testimonials() {
  const headingRef = useRef(null);
   const [formData, setFormData] = useState()
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "client_testimonials",
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
  
  const settings = {
    dots: false,
    arrows: true,
    fade: true,
    
  };



  return (
    <section className="testimonialSection">
      <div className="container">
        <div className="section-heading pb-4">
          <span>{formData?.title}</span>
          <h2 ref={headingRef} className="split-text">{formData?.heading}</h2>
        </div>
        <Slider className="testimonialSlider" {...settings}>
          {formData?.details.map((item, idx) => (
            <div key={idx}>
              <div className="testimonialContnt">
                <div className="testimonialTxt">
                  <span className="starrating">
                    <img src="/images/star.svg" alt="rating" width="100" />
                  </span>
                  <p>"{item.note}"</p>
                  <div className="userName">
                    <figure>
                      <img src={`${config.imageurl}/${item?.image}`} alt="user" />
                    </figure>
                    <p><b>{item.name}</b> {item.designation}</p>
                  </div>
                </div>
                <div className="testimonialImg text-center">
                  <img
                    className="d-block mx-auto"
                    src={`${config.imageurl}/${formData?.cover_image}`}
                    alt="testimonial"
                    width="350"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;
