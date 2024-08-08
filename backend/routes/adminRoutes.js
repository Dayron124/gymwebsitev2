import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
