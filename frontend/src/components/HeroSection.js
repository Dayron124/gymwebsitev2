import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const HeroSection = () => {
  return (
    <Box className="hero-section">
      <Container maxWidth="md" className="hero-content">
        <Typography variant="h2" component="h1" gutterBottom className="hero-title">
          Transform Your Life Today
        </Typography>
        <Typography variant="h5" component="p" gutterBottom className="hero-subtitle">
          Join our community and start your journey towards a healthier, stronger you.
        </Typography>
        <Button variant="contained" size="large" className="hero-button">
          Button
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
