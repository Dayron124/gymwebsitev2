import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.route('/profile').get(authMiddleware, getUserProfile).put(authMiddleware, updateUserProfile);

export default router;
