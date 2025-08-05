import React, { useState, useEffect ,useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        console.log("Our Team List ",res.data?.data)
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
    }, 200); 
  
    return () => clearTimeout(timeout);
  }, [formData]);

  // Carousel settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
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
        
        <div className="teamSlider">
          <Slider {...settings}>
            {formData?.details.map((member, idx) => (
              <div key={idx} className="team-slide">
                <div className="teamContent">
                  <figure>
                    <img src={`${config.imageurl}/${member.image}`} alt={member.name} />
                    <div className="teamSocial">
                      <a href={member?.twitter_link}>
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
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Team;
  