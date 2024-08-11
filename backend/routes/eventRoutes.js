import express from 'express';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js'; // Ensure the path is correct

const router = express.Router();

// Route to create a new event - only accessible by admin
router.post('/', protect, adminMiddleware, createEvent);

// Route to get all events
router.get('/', getEvents);

// Route to get a single event by ID
router.get('/:id', getEventById);

// Route to update an event by ID - only accessible by admin
router.put('/:id', protect, adminMiddleware, updateEvent);

// Route to delete an event by ID - only accessible by admin
router.delete('/:id', protect, adminMiddleware, deleteEvent);

export default router;
