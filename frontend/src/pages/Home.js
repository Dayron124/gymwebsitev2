import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutUsSection from '../components/AboutUsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import CTASection from '../components/CTASection';
//import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutUsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
