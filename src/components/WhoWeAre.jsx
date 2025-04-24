// File: components/WhoWeAre.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
const headingText = "Empowering Brand Growth Together";

function WhoWeAre() {
  const bgClasses = ["none","bg-light", "bg-success", "bg-sky", "bg-lightpink"];
  const [activeModal, setActiveModal] = useState(null);
  const headingRef = useRef(null);
  const [formData, setFormData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(config.GetWhoWeAre, {
          section_name: "who_we_are",
        });
        const data = res.data?.data;

        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching section:", err);
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
    }, 200); // Wait for scrollTo(0, 0) to settle
  
    return () => clearTimeout(timeout);
  }, [formData]);
  
  return (
    <section className="whoWeAre">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pe-lg-4">
            <figure>
              {/* <img src="/images/brand.png" alt="Brand" /> */}
              <img src={`${config.imageurl}/${formData?.cover_image}`} />
            </figure>
          </div>

          <div className="col-lg-6 ps-lg-4">
            <div className="weAreTxt">
              <div className="section-heading text-start pb-0">
                <span>{formData?.title}</span>
                <h2 className="mw-100 split-text" ref={headingRef}>
                  {formData?.heading}
                </h2>

                <p>{formData?.main_description}</p>
              </div>
              <ul>
                <li>
                  <div
                    className="empoweringTxt"
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#corporateIdentity"
                  >
                    <strong>
                      {formData?.corporate_identity?.corporate_text}{" "}
                      <img src="/images/arrow-green.svg" alt="" width="24" />
                    </strong>
                    <p> {formData?.corporate_identity?.description}</p>
                  </div>
                </li>
                <li>
                  <div
                    className="empoweringTxt"
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#needEdugure"
                  >
                    <strong>
                      {formData?.why_you_need?.text}
                      <img src="/images/arrow-green.svg" alt="" width="24" />
                    </strong>
                    <p>{formData?.why_you_need?.why_description}</p>
                  </div>
                </li>
                <li>
                  <div
                    className="empoweringTxt"
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#sourceBenifits"
                  >
                    <strong>
                      {formData?.outsourcing?.text}
                      <img src="/images/arrow-green.svg" alt="" width="24" />
                    </strong>
                    <p>{formData?.outsourcing?.description}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal-1*/}
      <div className="modal fade" id="corporateIdentity">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-6 fw-semibold">
                Corporate Identity
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
                <div className="col-md-5 pe-md-2 mb-3">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="boxCorporate ">
                        <strong>
                          {formData?.corporate_identity?.vision_title}
                        </strong>
                        <p>
                          {/* Creating <span> BRAND</span> and generating{" "}
                    <span> VALUE</span> */}
                          {formData?.corporate_identity?.vision_description}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="boxCorporate bg-success h-100">
                        <strong>
                          {formData?.corporate_identity?.mission_title}
                        </strong>
                        <p>
                          {formData?.corporate_identity?.mission_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 ps-md-2 mb-3">
                  <div className="boxCorporate bg-light h-100">
                    <strong>
                      {" "}
                      {formData?.corporate_identity?.management_title}
                    </strong>
                    <p>
                      {/* The Management Operates under three principles of integrity,
                innovation and initiative. */}
                      {formData?.corporate_identity?.management_description}
                    </p>
                    {/* <p>
                <span> Integrity:</span> Forms the basis of our relationship.
              </p> */}
                    {/* <p>
                <span> Innovation:</span> Enables us to serve with advanced
                technology as well new range of services.
              </p> */}
                    {/* <p>
                <span> Innovation:</span> Prepares us to look ahead into the
                future and act swiftly towards the ever- changing market we are
                facing with.
              </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {modal -2} */}
      <div className="modal fade" id="needEdugure">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-6 fw-semibold">
                {" "}
                {formData?.why_you_need?.text}
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
                <div className="col-md-3 pe-md-0 mb-3">
                  <figure className="modalleftImg">
                    {/* <img src="images/neededuguru-img.jpg" alt="" /> */}
                    <img
                      src={`${config.imageurl}/${formData?.why_you_need?.image}`}
                    />
                  </figure>
                </div>
                <div className="col-md-9 ps-md-0 mb-3">
                  <ul className="eduguruUl">
                    {formData?.why_you_need?.reasons.map((item, index) => {
                      const className = bgClasses[index % bgClasses.length];
                      
                      return (
                        <li key={index} className={className}>
                          <figure>
                            <img src="images/mind-icon.png" alt="" width={20} />
                          </figure>
                          <strong>{item}</strong>
                        </li>
                      );
                    })}
                    {/* <li className="bg-light">
                      <figure>
                        <img src="images/mind-icon.png" alt="" width={20} />
                      </figure>
                      <strong>Encash Market Opportunities</strong>
                    </li>
                    <li className="bg-success">
                      <figure>
                        <img src="images/mind-icon.png" alt="" width={20} />
                      </figure>
                      <strong>Achieve Organizational Efficiency</strong>
                    </li>
                  
                    <li className="bg-sky">
                      <figure>
                        <img src="images/mind-icon.png" alt="" width={20} />
                      </figure>
                      <strong>
                        Better Understanding of Business Complexities
                      </strong>
                    </li>
                  
                    <li className="bg-lightpink">
                      <figure>
                        <img src="images/mind-icon.png" alt="" width={20} />
                      </figure>
                      <strong>Cost Effectiveness &amp; Time Management</strong>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal-3 */}
      <div className="modal fade" id="sourceBenifits">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header border-0 mb-4">
              <h1 className="modal-title fs-6 fw-semibold text-white">
                {formData?.outsourcing?.text}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <ul className="benifitsUl">
                {formData?.outsourcing?.details.map((item, index) => (
                  <li key={index}>
                    <div className="benifitBox">
                      <figure className="m-0">
                        <img src={`${config.imageurl}/${item?.image}`} alt="" />
                      </figure>
                      <b>01</b>
                      <span>{item?.texts}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
