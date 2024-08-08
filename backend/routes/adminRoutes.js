import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import { getAllUsers, updateUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
