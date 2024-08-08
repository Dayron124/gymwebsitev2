import Tracker from '../models/Tracker.js';

export const getAllTrackers = async (req, res) => {
  try {
    const trackers = await Tracker.find();
    res.json(trackers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTracker = async (req, res) => {
  const { user, type, data } = req.body;

  try {
    const newTracker = new Tracker({ user, type, data });
    await newTracker.save();
    res.status(201).json(newTracker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrackerById = async (req, res) => {
  try {
    const tracker = await Tracker.findById(req.params.id);
    if (!tracker) {
      return res.status(404).json({ message: 'Tracker not found' });
    }
    res.json(tracker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTracker = async (req, res) => {
  try {
    const updatedTracker = await Tracker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTracker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTracker = async (req, res) => {
  try {
    await Tracker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tracker deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
