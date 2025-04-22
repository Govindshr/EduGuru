import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../admin/services/config";

function Banner({ onContactClick }) {
  const [formData, setFormData] = useState();
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
  }, []);

  const handleDesignClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
              <a onClick={handleDesignClick} className="buttonIcon">
                <img src="/images/arrow-white.svg" alt="" />
              </a>
            </figure>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Design Modal</h2>
            <p>This modal contains a heading and a paragraph to guide the user.</p>
            <button className="btn btn-secondary mt-3" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

<style jsx>{`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease forwards;
  }

  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    text-align: center;
    transform: scale(0.9);
    opacity: 0;
    animation: zoomIn 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes zoomIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`}</style>

    </section>
  );
}

export default Banner;
