// src/components/DietaryResources.js
import React from 'react';

const DietaryResources = () => {
  return (
    <div className="blog-card">
      <img src="/path/to/dietary-resources-image.jpg" alt="Dietary Resources" className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">Dietary Resources</h2>
        <p className="blog-excerpt">Explore a wide range of dietary resources to help you make informed nutritional decisions...</p>
        <button className="read-more-button">Read More</button>
      </div>
    </div>
  );
};

export default DietaryResources;
