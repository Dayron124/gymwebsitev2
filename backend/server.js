import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Logger middleware
import helmet from 'helmet'; // Security middleware
import xssClean from 'xss-clean'; // Prevent XSS attacks
import rateLimit from 'express-rate-limit'; // Rate limiting
import cors from 'cors'; // CORS handling
import compression from 'compression'; // Gzip compression
import path from 'path';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js'; // Import profile routes
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import named exports

dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1);
}

connectDB();

const app = express();

// Use security middlewares
app.use(helmet());
app.use(xssClean());

// Body parser middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  credentials: true, // Allow credentials like cookies and authorization headers
}));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes); // Register profile routes

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
