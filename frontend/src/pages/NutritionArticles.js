// src/components/NutritionArticles.js
import React from 'react';

const NutritionArticles = () => {
  return (
    <div className="blog-card">
      <img src="/path/to/nutrition-articles-image.jpg" alt="Nutrition Articles" className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">Nutrition Articles</h2>
        <p className="blog-excerpt">Stay updated with the latest nutrition articles and insights to maintain a balanced diet...</p>
        <button className="read-more-button">Read More</button>
      </div>
    </div>
  );
};

export default NutritionArticles;
