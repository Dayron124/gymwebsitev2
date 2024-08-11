import express from 'express';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser); // Route for user registration
router.post('/login', loginUser); // Route for user login

// Protected Routes
router.get('/profile', protect, getUserProfile); // Route for getting user profile

// Admin Routes
router.get('/admin/users', protect, adminMiddleware, getAllUsers); // Fetch all users (admin only)
router.put('/admin/users/:id', protect, adminMiddleware, updateUser); // Update user details (admin only)
router.delete('/admin/users/:id', protect, adminMiddleware, deleteUser); // Delete a user (admin only)

// Test route
router.post('/test', (req, res) => {
  res.status(200).json({ message: 'Test route works!' });
});

export default router;
