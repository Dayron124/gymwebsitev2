import React from 'react';
import styled from 'styled-components';

// Styled component for Footer
const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

// Footer component to display copyright information
const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Dash. All Rights Reserved.</p>
    </FooterContainer>
  );
}

export default Footer;
