// backend/routes/profileRoutes.js
import express from 'express';
import { updateProfile, uploadProfilePicture } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage });

// Route for updating profile information
router.put('/', protect, updateProfile);

// Route for uploading profile pictures
router.post('/upload', protect, upload.single('profileImage'), uploadProfilePicture);

export default router;
