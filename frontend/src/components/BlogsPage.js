// src/components/BlogsPage.js
import React, { Suspense, useState } from 'react';
import '../assets/styles/styles.css';
import DietaryResources from '../pages/DietaryResources';
import NutritionArticles from '../pages/NutritionArticles';
import NutritionChallenges from '../pages/NutritionChallenges';
import PersonalizedMealPlans from '../pages/PersonalizedMealPlans';
import RecipesMealPrep from '../pages/RecipesMealPrep';
import SupplementsGuide from '../pages/SupplementsGuide';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';

const BlogsPage = () => {
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([
    <DietaryResources />,
    <NutritionArticles />,
    <NutritionChallenges />,
    <PersonalizedMealPlans />,
    <RecipesMealPrep />,
    <SupplementsGuide />,
  ]);

  const fetchMoreData = () => {
    // Simulate a fetch
    setTimeout(() => {
      setItems(items.concat([
        <DietaryResources />,
        <NutritionArticles />,
        <NutritionChallenges />,
        <PersonalizedMealPlans />,
        <RecipesMealPrep />,
        <SupplementsGuide />,
      ]));
      if (items.length >= 18) { // Limit to 3 fetches
        setHasMore(false);
      }
    }, 1500);
  };

  return (
    <div className="blogs-page">
      {/* SEO Optimization */}
      <Helmet>
        <title>Latest Articles & Insights</title>
        <meta name="description" content="Discover tips, trends, and stories from our fitness community. Read the latest articles on nutrition, wellness, and more." />
      </Helmet>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Latest Articles & Insights</h1>
          <p className="hero-subtitle">Discover tips, trends, and stories from our fitness community.</p>
          <button className="hero-button" aria-label="Explore Articles">Explore Now</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* Blog Cards Section */}
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="blog-cards">
            <Suspense fallback={<div>Loading...</div>}>
              {items.map((item, index) => (
                <div key={index} className="blog-card">
                  <img 
                    src={`https://via.placeholder.com/300x200?text=Blog+Image+${index + 1}`} 
                    alt={`Blog Post ${index + 1}`} 
                    className="blog-image"
                  />
                  {item}
                </div>
              ))}
            </Suspense>
          </div>
        </InfiniteScroll>

        {/* Sidebar Section */}
        <div className="sidebar">
          <div className="search-bar">
            <input type="text" placeholder="Search blog..." aria-label="Search blog" />
          </div>
          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li><button aria-label="Fitness Category">Fitness</button></li>
              <li><button aria-label="Nutrition Category">Nutrition</button></li>
              <li><button aria-label="Wellness Category">Wellness</button></li>
            </ul>
          </div>
          <div className="recent-posts">
            <h3>Recent Posts</h3>
            <ul>
              <li><a href="#" aria-label="Read Post Title 1">Post Title 1</a></li>
              <li><a href="#" aria-label="Read Post Title 2">Post Title 2</a></li>
              <li><a href="#" aria-label="Read Post Title 3">Post Title 3</a></li>
            </ul>
          </div>
          <div className="tags">
            <h3>Popular Tags</h3>
            <div className="tag-list">
              <button aria-label="Fitness Tag">Fitness</button>
              <button aria-label="Health Tag">Health</button>
              <button aria-label="Training Tag">Training</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination" aria-label="Pagination">
        <button className="page-number">1</button>
        <button className="page-number">2</button>
        <button className="page-number">3</button>
      </div>
    </div>
  );
};

export default BlogsPage;
