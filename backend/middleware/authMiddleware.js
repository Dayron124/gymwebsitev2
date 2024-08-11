import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes and check if the user is authenticated
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if the user is an admin
export const adminMiddleware = (req, res, next) => {
  // Ensure that the user is authenticated first
  protect(req, res, () => {
    // Check if the user has admin privileges
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    
    // If the user is not an admin, respond with a 403 Forbidden status
    res.status(403).json({ message: 'Access denied. Admins only.' });
  });
};
