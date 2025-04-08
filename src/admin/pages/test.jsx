// File: App.jsx or any test page
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const headingRef = useRef(null);

  useEffect(() => {
    const chars = headingRef.current.querySelectorAll(".char");

    gsap.from(chars, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 1.2,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        end: "bottom 50%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const headingText = "Empowering Brand Growth Together";
  const renderSplit = () =>
    headingText.split("").map((char, i) => (
      <span key={i} className="char d-inline-block">
        {char}
      </span>
    ));

  return (
    <div style={{ height: "200vh", paddingTop: "50vh" }}>
      <h1 ref={headingRef}>{renderSplit()}</h1>
    </div>
  );
}
