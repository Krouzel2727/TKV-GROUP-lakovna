import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import TechSpecs from './components/TechSpecs';
import NewHall from './components/NewHall';
import Gallery from './components/Gallery';
import References from './components/References';
import CtaSection from './components/CtaSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans text-textMain bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <TechSpecs />
      <NewHall />
      <Gallery />
      <References />
      <CtaSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
