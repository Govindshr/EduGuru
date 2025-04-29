import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../admin/services/config";

function Banner({ onContactClick }) {
  const [formData, setFormData] = useState();
  const [aboutformdata , setAboutFormData] = useState()
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "main_banner",
        });
        const data = res.data?.data;
        if (data) setFormData(data);
      } catch (err) {
        console.error("Error fetching main banner:", err);
      }
    };
    fetchSection();
    fetchAboutSection()
  }, []);

  const fetchAboutSection = async () => {
    try {
      const res = await axios.post(config.GetSections, {
        section_name: "about_founder",
      });
      const data = res.data?.data;
      if (data) setAboutFormData(data);
    } catch (err) {
      console.error("Error fetching main banner:", err);
    }
  };

  return (
    <section className="mainbanner">
      <div className="container">
        <div className="bannerConent d-flex flex-wrap align-items-end">
          <div className="bannerTxt">
            <span>{formData?.title}</span>
            <h1>
              {formData?.heading}<b>{formData?.subheading}</b>
            </h1>
            <p>{formData?.description}</p>
            <button onClick={onContactClick} className="btn btn-success">
              Contact Us <i><img src="/images/arrow-green.svg" alt="" width="20" /></i>
            </button>
          </div>

          <div className="bannerimg">
            <figure className="mb-0 d-inline-block position-relative" style={{ cursor: 'pointer' }}>
              <img src={`${config.imageurl}/${formData?.profile_image}`} alt="Banner" width="340" />
              <a  data-bs-toggle="modal"
                    data-bs-target="#founderInsight" className="buttonIcon">
                <img src="/images/arrow-white.svg" alt="" />
              </a>
            </figure>
          </div>
        </div>
      </div>

      <div className="modal fade founderInsight" id="founderInsight">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-6 fw-semibold">
              Founder's Insight:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4 pe-md-2 mb-3">
               <figure className="johnImg">
               <img src={`${config.imageurl}/${aboutformdata?.profile_image}`} alt="" width="20" />
               </figure>
                </div>
                <div className="col-md-8 ps-md-2 mb-3">
                 <h4>{aboutformdata?.title}</h4>
                 {/* <p>{aboutformdata?.heading}</p> */}
                 <p
     
      dangerouslySetInnerHTML={{ __html: aboutformdata?.heading }}
    />                 
                </div>
              </div>
              {/* <p>{aboutformdata?.subheading}</p> */}
              <p
     
      dangerouslySetInnerHTML={{ __html: aboutformdata?.subheading }}
    />                
            </div>
          </div>
        </div>
      </div>



    </section>
  );
}

export default Banner;
