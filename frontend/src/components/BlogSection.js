import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const blogPosts = [
  {
    title: 'How to Get Started with Our Platform',
    excerpt: 'Learn how to make the most of our platform with this beginner\'s guide.',
    image: 'https://source.unsplash.com/random/4',
  },
  {
    title: 'Top 10 Features You Need to Know About',
    excerpt: 'Discover the top 10 features that will help you achieve your goals.',
    image: 'https://source.unsplash.com/random/5',
  },
  {
    title: 'Success Stories from Our Users',
    excerpt: 'Read about how our users have achieved success using our platform.',
    image: 'https://source.unsplash.com/random/6',
  },
];

const BlogSection = () => {
  return (
    <Container sx={{ padding: '4rem 0' }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Latest Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h6" component="h3">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogSection;
