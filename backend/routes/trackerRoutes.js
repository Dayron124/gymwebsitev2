import express from 'express';
import { getAllTrackers, createTracker, getTrackerById, updateTracker, deleteTracker } from '../controllers/trackerController.js';

const router = express.Router();

router.get('/', getAllTrackers);
router.post('/', createTracker);
router.get('/:id', getTrackerById);
router.put('/:id', updateTracker);
router.delete('/:id', deleteTracker);

export default router;
