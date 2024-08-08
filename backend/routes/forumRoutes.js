import express from 'express';
import { getAllForums, createForum, getForumById, updateForum, deleteForum } from '../controllers/forumController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllForums);
router.post('/', authMiddleware, createForum);
router.get('/:id', getForumById);
router.put('/:id', authMiddleware, updateForum);
router.delete('/:id', authMiddleware, deleteForum);

export default router;
