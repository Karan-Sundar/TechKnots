
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Programs from '@/components/Programs';
import CourseTopics from '@/components/CourseTopics';
import Timeline from '@/components/Timeline';
import Benefits from '@/components/Benefits';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Helmet } from 'react-helmet';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "TechKnots - Tying the knot between theory and practice";
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <Programs />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <CourseTopics />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <Timeline />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <Benefits />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index;
