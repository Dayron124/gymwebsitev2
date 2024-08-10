import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HealingIcon from '@mui/icons-material/Healing';

const features = [
  {
    title: 'Personalized Training Programs',
    description: 'Tailored workout plans designed by expert trainers to help you achieve your fitness goals.',
    icon: <FitnessCenterIcon style={{ fontSize: 50, color: '#1E90FF' }} />,
  },
  {
    title: 'High-Intensity Interval Training (HIIT)',
    description: 'Short bursts of intense exercise for maximum calorie burn and increased endurance.',
    icon: <FlashOnIcon style={{ fontSize: 50, color: '#1E90FF' }} />,
  },
  {
    title: 'Yoga and Pilates',
    description: 'Improve flexibility, strength, and mental focus with our yoga and Pilates classes.',
    icon: <SelfImprovementIcon style={{ fontSize: 50, color: '#1E90FF' }} />,
  },
  {
    title: 'Nutrition and Wellness Coaching',
    description: 'Personalized nutrition plans and wellness coaching to complement your fitness journey.',
    icon: <LocalDiningIcon style={{ fontSize: 50, color: '#1E90FF' }} />,
  },
  {
    title: 'State-of-the-Art Cardio Equipment',
    description: 'The latest machines for effective cardiovascular workouts, available anytime.',
    icon: <DirectionsRunIcon style={{ fontSize: 50, color: '#1E90FF' }} />,
  },
  {
    title: 'Recovery and Rehabilitation',
    description: 'Services including massage therapy, saunas, and more to help you recover and stay healthy.',
    icon: <HealingIcon style={{ fontSize: 50, color: '#1E90FF' }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Box className="features-section">
      <Container sx={{ padding: '4rem 0' }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom className="features-title">
          Why Choose Our Gym?
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '2rem' }}>
          Discover the benefits of joining our gym and how we can help you achieve your fitness goals.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: '2rem',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 10px 20px rgba(30, 144, 255, 0.5)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" sx={{ marginBottom: '1rem', fontWeight: 'bold', color: '#333' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" component="p" sx={{ color: '#555' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
