import express from 'express';
import { getAllWorkouts, createWorkout, getWorkoutById, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';

const router = express.Router();

router.get('/', getAllWorkouts);
router.post('/', createWorkout);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
