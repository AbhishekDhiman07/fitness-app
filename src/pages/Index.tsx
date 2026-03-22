import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <div id="features">
      <Features />
    </div>
    <div id="testimonials">
      <Testimonials />
    </div>
    <CTA />
    <div id="contact">
      <Contact />
    </div>
    <Footer />
  </div>
);

export default Index;
