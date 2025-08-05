// Clients.jsx
import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import { config } from "../admin/services/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Wrap component in forwardRef to capture ref from parent
const Clients = forwardRef((props, ref) => {
  const [partners, setPartners] = useState([]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 479, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.post(config.GetAllPartners);
        setPartners(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="clientSection" ref={ref}>
      <Slider className="clientSlider" {...settings}>
        {partners.map((src, idx) => (
          <div key={idx}>
            <figure>
              <img
                src={`${config.imageurl}/${src.partner_logo}`}
                alt={`client-logo-${idx}`}
              />
            </figure>
          </div>
        ))}
      </Slider>
    </section>
  );
});

export default Clients;
