// src/components/SupplementsGuide.js
import React from 'react';

const SupplementsGuide = () => {
  return (
    <div className="blog-card">
      <img src="/path/to/supplements-guide-image.jpg" alt="Supplements Guide" className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">Supplements Guide</h2>
        <p className="blog-excerpt">Navigate through our supplements guide to enhance your diet and training regimen...</p>
        <button className="read-more-button">Read More</button>
      </div>
    </div>
  );
};

export default SupplementsGuide;
