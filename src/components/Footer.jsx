import React, { useState ,useEffect ,useRef} from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";


function Footer() {
  const [formData, setFormData] = useState({ name: "", phone_number: "", subject: "" });
  const headingRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.post(config.GetSections, {
          section_name: "contact_us",
        });
        const data = res.data?.data;
        if (data) {
          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            heading: data.heading || "",
            description: data.description || "",
            image: null,
            image_preview: data.image ? `${config.imageurl}/${data.image.replace(/\\/g, '/')}` : ""
          }));
        }
      } catch (err) {
        console.error("Error fetching contact us section:", err);
      }
    };
    fetchSection();
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
  
  const handleSubmit = async () => {
    try {
      const res = await axios.post(config.SaveQuery, formData);
      alert(res.data.message);
      setFormData({ name: "", phone_number: "", subject: "" });
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Failed to submit query");
    }
  };

  return (
    <footer className="footerMain">
      <div className="footerTop">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-6 mb-3">
              <div className="footerContact">
                <div className="bgimg">
                  <img src="/images/footer-bg.svg" alt="" />
                </div>
                <span>{formData?.title}</span>
                <h2 ref={headingRef} className="split-text">{formData?.heading}</h2>
                <p>
                {formData?.description}
                </p>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="NAME"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="SUBJECT"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="StartCouncilGroup">
                        <button type="button" className="startBtn" onClick={handleSubmit}>
                          Start Council
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <figure className="position-relative z-1">
                <img src={formData.image_preview} alt="" width="500" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="footerBttom">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-6">
              <figure>
                <img src="/images/logo-white.svg" alt="" width="100" />
              </figure>
              <p>
                <img src="/images/email.svg" alt="" width="15" className="me-2" /> text@eduguru.com
              </p>
              <p>
                <img src="/images/call.svg" alt="" width="15" className="me-2" /> 0141-123-4567
              </p>
            </div>
            <div className="col-md-6">
              <div className="footerSocila">
                <a href="">
                  <img src="/images/facebook-icon.svg" alt="" />
                </a>
                <a href="">
                  <img src="/images/instagram-icon.svg" alt="" />
                </a>
                <a href="">
                  <img src="/images/twitter-white.svg" alt="" />
                </a>
                <a href="">
                  <img src="/images/linkedin-white.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
