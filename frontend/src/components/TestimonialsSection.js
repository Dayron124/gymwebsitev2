// src/components/TestimonialsSection.js
import React, { useState } from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS

const testimonialsData = [
    {
        image: 'https://via.placeholder.com/80?text=Photo+1',
        text: 'This gym has completely changed my life. The trainers are amazing!',
        name: 'John Doe',
        title: 'Gym Member',
        rating: 5
    },
    {
        image: 'https://via.placeholder.com/80?text=Photo+2',
        text: 'The best gym experience I have ever had. Highly recommended!',
        name: 'Jane Smith',
        title: 'Athlete',
        rating: 4
    },
    // Add more testimonials as needed
];

const TestimonialsSection = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (index) => {
        setRating(index);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="testimonials-section">
            <h2 className="section-title">What Our Members Say</h2>
            <Slider {...settings} className="testimonials-carousel">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        <img 
                            src={testimonial.image} 
                            alt={`${testimonial.name} photo`} 
                            className="testimonial-image" 
                        />
                        <div className="testimonial-content">
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-rating">
                                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                            </div>
                            <h4 className="testimonial-name">{testimonial.name}</h4>
                            <p className="testimonial-title">{testimonial.title}</p>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="testimonial-form-container">
                <h3>Submit Your Testimonial</h3>
                <form className="testimonial-form">
                    <input type="text" placeholder="Your Name" />
                    <textarea placeholder="Your Testimonial"></textarea>
                    <div className="rating-container">
                        <label>Your Rating:</label>
                        <div className="stars">
                            {[...Array(5)].map((star, index) => (
                                <span
                                    key={index}
                                    className={index < rating ? 'active-star' : ''}
                                    onClick={() => handleRating(index + 1)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="testimonial-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TestimonialsSection;
