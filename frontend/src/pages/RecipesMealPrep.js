// src/components/RecipesMealPrep.js
import React from 'react';

const RecipesMealPrep = () => {
  return (
    <div className="blog-card">
      <img src="/path/to/recipes-meal-prep-image.jpg" alt="Recipes & Meal Prep" className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">Recipes & Meal Prep</h2>
        <p className="blog-excerpt">Discover delicious recipes and meal prep ideas that align with your nutritional goals...</p>
        <button className="read-more-button">Read More</button>
      </div>
    </div>
  );
};

export default RecipesMealPrep;
