import React, { useState, useEffect, useRef, forwardRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";

gsap.registerPlugin(ScrollTrigger);


  const Footer = forwardRef((props, ref) => {
  const headingRef = useRef(null);
  const [captcha, setCaptcha] = useState({ question: "", answer: "" });
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptcha({
      question: `What is ${num1} + ${num2}?`,
      answer: String(num1 + num2),
    });
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    subject: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus({ message: "", type: "" });
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
            email: data.email || "",
            mobile_number: data.mobile_number || "",
            fb_link: data.fb_link || "",
            insta_link: data.insta_link || "",
            twitter_link: data.twitter_link || "",
            linkedin_link: data.linkedin_link || "",
            image: null,
            image_preview: data.image
              ? `${config.imageurl}/${data.image.replace(/\\/g, "/")}`
              : "",
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
    }, 200); // Delay to ensure scroll position is respected

    return () => clearTimeout(timeout);
  }, [formData]);

  const handleSubmit = async () => {
    const { name, phone_number, subject } = formData;

    if (!name || !phone_number || !subject || captchaInput !== captcha.answer) {
      setStatus({
        message: "Please fill all fields and solve the captcha correctly.",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.post(config.SaveQuery, formData);
      setFormData({ name: "", phone_number: "", subject: "" });
      setStatus({
        message: res.data.message || "Submitted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting query:", error);
      setStatus({ message: "Failed to submit query.", type: "error" });
    }
  };

  return (
    <footer
      className="footerMain"
      ref={ref}
      style={{ backgroundImage: "url(images/footer-img.jpg)" }}
    >
      <div className="footerTop">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-6 mb-3">
              <div className="footerContact">
                <div className="bgimg">
                  <img src="/images/footer-bg.svg" alt="" />
                </div>
                <span>{formData?.title}</span>
                <h2 ref={headingRef} className="split-text">
                  {formData?.heading}
                </h2>
                <p>{formData?.description}</p>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="NAME"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="SUBJECT"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label mb-2 fw-bold text-white">
                        {captcha.question}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded border px-3 py-2"
                        placeholder="Enter your answer"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <div className="StartCouncilGroup">
                        <button
                          type="button"
                          className="startBtn"
                          onClick={handleSubmit}
                        >
                          Start Consulting
                        </button>

                        {status.message && (
                          <div
                            className="d-flex justify-content-center"
                            style={{ marginTop: "5px", color: "white" }}
                          >
                            {status.message}
                          </div>
                        )}
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
                <img
                  src="/images/email.svg"
                  alt=""
                  width="15"
                  className="me-2"
                />{" "}
                {formData.email}
              </p>
              <p>
                <img
                  src="/images/call.svg"
                  alt=""
                  width="15"
                  className="me-2"
                />{" "}
                {formData.mobile_number}
              </p>
            </div>
            <div className="col-md-6">
              <div className="footerSocila">
                <a href={formData.fb_link}>
                  <img src="/images/facebook-icon.svg" alt="" />
                </a>
                <a href={formData.insta_link}>
                  <img src="/images/instagram-icon.svg" alt="" />
                </a>
                <a href={formData.twitter_link}>
                  <img src="/images/twitter-white.svg" alt="" />
                </a>
                <a href={formData.linkedin_link}>
                  <img src="/images/linkedin-white.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
})

export default Footer;
