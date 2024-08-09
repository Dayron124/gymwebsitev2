import React, { useEffect, useState } from 'react';
import axios from '../api/apiClient';
import ClassCard from '../components/ClassCard';
import styled from 'styled-components';

// Styled component for Classes page
const ClassesContainer = styled.div`
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .class-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

// Classes component fetching and displaying class data
const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  return (
    <ClassesContainer>
      <h2>Our Classes</h2>
      <div className="class-list">
        {classes.map(gymClass => (
          <ClassCard key={gymClass._id} gymClass={gymClass} />
        ))}
      </div>
    </ClassesContainer>
  );
}

export default Classes;
