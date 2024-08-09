import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutUsSection from './AboutUsSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import CTASection from './CTASection';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutUsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
