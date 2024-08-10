import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const CTASection = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: '#fff', padding: '4rem 0' }}>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" component="p" sx={{ marginBottom: '2rem' }}>
          Join us today and take the first step towards achieving your goals.
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Sign Up Now
        </Button>
      </Container>
    </Box>
  );
};

export default CTASection;
