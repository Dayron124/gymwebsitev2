import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import classRoutes from './routes/classRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import productRoutes from './routes/productRoutes.js';
import trackerRoutes from './routes/trackerRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

connectDB(); // Connect to the database

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/products', productRoutes);
app.use('/api/trackers', trackerRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
