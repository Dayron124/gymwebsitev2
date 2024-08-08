import express from 'express';
import { getAllClasses, createClass, getClassById, updateClass, deleteClass } from '../controllers/classController.js';

const router = express.Router();

router.get('/', getAllClasses);
router.post('/', createClass);
router.get('/:id', getClassById);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;
