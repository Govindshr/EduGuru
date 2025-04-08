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
  return (
    <>
      <Header />
      <Banner />
      <WhoWeAre/>
      <DesignSolution/>
      <Skills/>
      <Team/>
      <Portfolio/>
      <Testimonials/>
      <GetStarted/>
      <Clients/>
      <Footer/>
      {/* More sections coming here later */}
    </>
  );
}

export default LandingPage;
