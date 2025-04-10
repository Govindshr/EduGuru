import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
import { useParams } from "react-router-dom";

function MarketingSection({ onCategorySelect, selectedCategoryData }) {
  const { id } = useParams();
  const headingRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async (search = "", autoSelectFirst = false) => {
    try {
      const res = await axios.post(config.GetAllPageContents, {  heading: search,category_id: id } );
      const fetched = res.data?.data;
      setCategories(fetched);
      console.log("main id ", fetched)

      // ✅ Only auto-select first category if flag is true
      if (fetched.length && autoSelectFirst) {
        const firstId = fetched[0]._id;
        setActiveCategoryId(firstId);
        onCategorySelect?.(firstId);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories("", true); // ✅ only auto-select on mount
  }, []);

  useEffect(() => {
    if (!selectedCategoryData?.data[0]?.heading || !headingRef.current) return;
  
    const element = headingRef.current;
    const split = new SplitType(element, { types: "words, chars" });
  
    const timeline = gsap.timeline();
  
    timeline.from(split.words, {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });
  
    timeline.from(split.chars, {
      opacity: 0,
      x: 40,
      duration: 0.8,
      stagger: 0.01,
      ease: "power3.out",
      delay: 0.1,
    });
  
    return () => {
      split.revert();
      timeline.kill();
    };
  }, [selectedCategoryData]);
  
  const handleClick = (e, category) => {
    e.preventDefault();
    setActiveCategoryId(category?._id);
    onCategorySelect?.(category?._id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCategories(searchTerm, false); 
  };
console.log(selectedCategoryData)
  return (
    <section className="marketingSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-heading text-start">
              <h2
                ref={headingRef}
                className="mw-100 mb-4 split-text"
                key={selectedCategoryData?.data[0]?.heading}
              >
                {selectedCategoryData?.data[0]?.heading}
              </h2>

              <figure>
                <img
                  src={`${config.imageurl}/${selectedCategoryData?.data[0]?.image}`}
                  alt="Branding Portfolio"
                />
              </figure>
              <p>{selectedCategoryData?.data[0]?.description}</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="searchRight">
              <span>Search</span>
              <form className="searchInpt">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a style={{cursor:'pointer'}} onClick={handleSearch}>
                  <img src="images/search-icon.svg" alt="Search" width="20" />
                </a>
              </form>
              <hr className="my-3" />
              <span>Categories</span>
              <ul className="categoriesUl">
                {categories?.map((category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={
                        category._id === activeCategoryId ? "active" : ""
                      }
                      onClick={(e) => handleClick(e, category)}
                    >
                      {category?.heading}
                      <figure>
                        <img
                          src="images/arrow-normal-icon.svg"
                          alt="Arrow"
                          width="20"
                        />
                      </figure>
                    </a>
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

export default MarketingSection;
