import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  line-height: 1.6;

  h1, h2 {
    color: #ff416c;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  .mission,
  .values,
  .team,
  .history,
  .cta {
    margin-bottom: 3rem;
  }

  .team-members {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .member {
      flex: 1;
      min-width: 250px;
      text-align: center;

      img {
        border-radius: 50%;
        max-width: 150px;
        margin-bottom: 1rem;
      }

      h3 {
        margin-bottom: 0.5rem;
        color: #ff416c;
      }

      p {
        font-size: 0.9rem;
      }
    }
  }

  .cta-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #ff416c;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff4b2b;
    }
  }
`;

const AboutUs = () => {
  return (
    <AboutContainer>
      <h1>About Us</h1>

      {/* Mission Section */}
      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          At Dash, our mission is to empower individuals to achieve their fitness goals
          and become the best versions of themselves. We believe in the transformative
          power of fitness and are committed to providing the tools, community, and
          support necessary to help everyone on their journey to a healthier lifestyle.
        </p>
      </div>

      {/* Values Section */}
      <div className="values">
        <h2>Our Values</h2>
        <p>
          Our core values guide everything we do at Dash:
        </p>
        <ul>
          <li><strong>Integrity:</strong> We are honest, transparent, and committed to doing what's best for our members.</li>
          <li><strong>Community:</strong> We foster a supportive environment where everyone feels welcome.</li>
          <li><strong>Innovation:</strong> We continually seek out the latest advancements in fitness and wellness to bring you the best experience possible.</li>
          <li><strong>Excellence:</strong> We strive for excellence in everything we do, from our facilities to our services.</li>
        </ul>
      </div>

      {/* History Section */}
      <div className="history">
        <h2>Our History</h2>
        <p>
          Dash was founded in 2010 with the goal of creating a fitness community that goes beyond just workouts.
          Over the years, we've grown into a vibrant community with state-of-the-art facilities and a diverse
          range of programs designed to meet the needs of all our members. From humble beginnings, Dash has
          evolved into a leader in the fitness industry, with thousands of members who have achieved their
          fitness goals through our programs.
        </p>
      </div>

      {/* Team Section */}
      <div className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="member">
            <img src="/images/team-member-1.jpg" alt="Team Member 1" />
            <h3>Jane Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="member">
            <img src="/images/team-member-2.jpg" alt="Team Member 2" />
            <h3>John Smith</h3>
            <p>Head Trainer</p>
          </div>
          <div className="member">
            <img src="/images/team-member-3.jpg" alt="Team Member 3" />
            <h3>Emily Johnson</h3>
            <p>Nutrition Expert</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta">
        <h2>Join Us</h2>
        <p>
          Ready to take the next step in your fitness journey? Join our community and start transforming your life today.
        </p>
        <a href="/join" className="cta-button">Join Dash</a>
      </div>
    </AboutContainer>
  );
};

export default AboutUs;
