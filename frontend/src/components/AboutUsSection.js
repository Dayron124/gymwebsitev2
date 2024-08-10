import React from 'react';
import { Container, Grid, Typography, Box, Paper, Avatar } from '@mui/material';
import gymEquipment from '../assets/images/insidegym5.jpg';
import fitnessClass from '../assets/images/insidegym2.jpg';
import spa from '../assets/images/insidegym1.jpg';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Head Trainer',
    description: 'John has over 10 years of experience in personal training and fitness coaching. He specializes in HIIT and strength training.',
    avatar: 'https://source.unsplash.com/random/100x100?trainer',
  },
  {
    name: 'Jane Smith',
    role: 'Nutritionist',
    description: 'Jane is a certified nutritionist with a passion for helping clients achieve their health goals through personalized meal plans.',
    avatar: 'https://source.unsplash.com/random/100x100?nutritionist',
  },
  {
    name: 'Mike Johnson',
    role: 'Yoga Instructor',
    description: 'Mike is a yoga and Pilates instructor who focuses on helping clients improve flexibility, balance, and mental clarity.',
    avatar: 'https://source.unsplash.com/random/100x100?yoga',
  },
];

const AboutUsSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f4f4', padding: '4rem 0' }}>
      <Container>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '2rem' }}>
          Welcome to our gym! We are dedicated to providing a welcoming environment for everyone, whether you're just starting your fitness journey or you're a seasoned athlete.
        </Typography>

        {/* Our Story Section */}
        <Box sx={{ marginBottom: '4rem' }}>
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Our Story
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" component="p">
                Our gym was founded on the belief that everyone deserves access to high-quality fitness resources and support. We started with a small group of passionate trainers and have grown into a vibrant community of fitness enthusiasts. Our goal is to help you achieve your best self through personalized training, innovative equipment, and a supportive environment.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  backgroundImage: `url(${gymEquipment})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Our Mission Section */}
        <Box sx={{ marginBottom: '4rem' }}>
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" component="p" align="center" sx={{ marginBottom: '2rem' }}>
            Our mission is to empower individuals to lead healthier, happier lives through fitness and wellness. We believe that with the right tools, guidance, and community, anyone can achieve their fitness goals.
          </Typography>
        </Box>

        {/* Meet the Team Section */}
        <Box sx={{ marginBottom: '4rem' }}>
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Meet the Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
                  <Avatar
                    alt={member.name}
                    src={member.avatar}
                    sx={{ width: 100, height: 100, margin: '0 auto 1rem auto' }}
                  />
                  <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ color: '#ff416c', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Facilities Section */}
        <Box sx={{ marginBottom: '4rem' }}>
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Example
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundImage: `url(${gymEquipment})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" component="h3" align="center" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>
                Modern Equipment
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundImage: `url(${fitnessClass})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" component="h3" align="center" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>
                Group Classes
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundImage: `url(${spa})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" component="h3" align="center" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>
                Example
              </Typography>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </Box>
  );
};

export default AboutUsSection;
