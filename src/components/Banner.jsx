import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../admin/services/config";

function Banner({ onContactClick }) {
 const [formData, setFormData] = useState()
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "main_banner",
        });
        const data = res.data?.data;
        console.log(res.data?.data)
        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching main banner:", err);
      }
    };
    fetchSection();
  }, []);
    return (
      <section className="mainbanner">
        <div className="container">
          <div className="bannerConent d-flex flex-wrap align-items-end">
            <div className="bannerTxt">
              <span>{formData?.title}</span>
              <h1>
                {/* Build <b>Capacity for Business</b> */}
                {formData?.heading}<b>{formData?.subheading}</b>
              </h1>
              <p>
              {formData?.description}
              </p>
              <button onClick={onContactClick} className="btn btn-success">
              Contact Us <i><img src="/images/arrow-green.svg" alt="" width="20" /></i>
            </button>
            </div>
  
            <div className="bannerimg">
              <figure className="mb-0 d-inline-block position-relative">
                {/* <img src="/images/portrait-man.png" alt="Banner" width="340" /> */}
                <img src={`${config.imageurl}/${formData?.profile_image}`} alt="Banner" width="340" />
                
                <a onClick={onContactClick} className="buttonIcon">
                  <img src="/images/arrow-white.svg" alt="" />
                </a>
              </figure>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Banner;