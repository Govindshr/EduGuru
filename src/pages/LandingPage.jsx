import { useRef ,useEffect} from 'react';

import Header from '../components/Header';
import Banner from '../components/Banner';
import WhoWeAre from '../components/WhoWeAre';
import DesignSolution from '../components/DesignSolution';
import Skills from '../components/Skills';
import Team from '../components/Team';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import GetStarted from '../components/GetStarted';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

function LandingPage() {
  const footerRef = useRef(null);
  const whatweareref = useRef(null)

    useEffect(() => {
      window.history.scrollRestoration = "manual"; // Disable browser native restoration
      window.scrollTo({ top: 0, behavior: "instant" }); // No animation
    }, []);
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  const scrollToDesignSolutions = () => {
    whatweareref.current?.scrollIntoView({ behavior: 'instant' });
  };


  return (
    <>
      <Header />
      <Banner onContactClick={scrollToFooter}  />
      <WhoWeAre />
      <DesignSolution ref={whatweareref} />
      <Skills />
      <Team />
      <Portfolio />
      <Testimonials />  
      <GetStarted />
      <Clients  ref={footerRef} />
      <Footer />
    </>
  );
}

export default LandingPage;
