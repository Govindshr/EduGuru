import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { config } from "../admin/services/config";
import { useParams } from "react-router-dom";

function MarketingSection({ data ,onContactClick }) {
  const { id } = useParams();
  const headingRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  const fetchCategories = async (search = "") => {
    try {
      const res = await axios.post(config.GetAllPageContents, {
        heading: search,
        category_id: id,
      });
      setCategories(res.data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // No auto-select on mount
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!headingRef.current) return;
  
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
    }, 200); // Delay triggers after scroll is set
  
    return () => clearTimeout(timeout);
  }, [selectedCategoryData, data]);
  
  const handleClick = (e, category) => {
    e.preventDefault();
    setActiveCategoryId(category?._id);
    handleCategorySelect(category?._id);
  };

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    fetchCategories(searchTerm);
  }, 300); // 300ms delay

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);


  const handleSearch = (e) => {
    e.preventDefault();
    fetchCategories(searchTerm, false);
  };

  const handleCategorySelect = async (categoryId) => {
    try {
      const response = await axios.post(config.GetPageContentById, {
        id: categoryId,
      });
      const selected = response.data?.data?.[0];
      setSelectedCategoryData(selected);
    } catch (error) {
      console.error("Error fetching data for selected category:", error);
    }
  };

  return (
    <section className="marketingSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
         
            <div className="section-heading text-start">
              <h2
                ref={headingRef}
                className="mw-100 mb-4 split-text"
                key={selectedCategoryData?.heading || data?.name}
              >
                {selectedCategoryData?.heading || data?.name}
              </h2>
<figure key={selectedCategoryData?.image || data?.image}>
  <img
    src={`${config.imageurl}/${selectedCategoryData?.image || data?.image}`}
    alt={selectedCategoryData?.image || data?.image}
  />
</figure>
 
              <div
  dangerouslySetInnerHTML={{
    __html: selectedCategoryData?.description || data?.description || "",
  }}
/>

            </div>
            {selectedCategoryData?.contact_us_enabled && selectedCategoryData?.contact_us_enabled==true && <>
               <div >
 <a onClick={onContactClick} className="btn btn-success">
          {selectedCategoryData?.contact_us_label}{' '}
            <i>
              <img src="/images/arrow-green.svg" alt="Arrow" width="20" />
            </i>
          </a>
          
          </div>
          </> }
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
               <a style={{ cursor: "pointer" }}>
  <img src="images/search-icon.svg" alt="Search" width="20" />
</a>
              </form>
              <hr className="my-3" />
              <span>Categories</span>
             {categories?.length > 0 ? (
  <ul className="categoriesUl">
    {categories.map((category, index) => (
      <li key={index}>
        <a
          href="#"
          className={category._id === activeCategoryId ? "active" : ""}
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
) : (
  <div className="text-muted mt-2">No matching categories found.</div>
)}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketingSection;
