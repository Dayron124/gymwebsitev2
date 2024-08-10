// Footer.js
import React from 'react';
import { Container, Grid, Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: '#fff', padding: '2rem 0' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Dash Strength and Conditioning
            </Typography>
            <Typography variant="body2" component="p">
              © 2024 Dash Strength and Conditioning. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Links
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">Home</Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">About Us</Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">Services</Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">Contact</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">Facebook</Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">Twitter</Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">Instagram</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
