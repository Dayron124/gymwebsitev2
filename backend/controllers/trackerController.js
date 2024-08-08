import Tracker from '../models/Tracker.js';

export const getAllTrackers = async (req, res) => {
  console.log('Fetching all tracker entries');
  try {
    const trackers = await Tracker.find().sort({ date: -1 });
    console.log('Trackers fetched:', trackers.length);
    res.json(trackers);
  } catch (error) {
    console.error('Error fetching all trackers:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createTracker = async (req, res) => {
  const { user, type, value, date } = req.body;
  console.log('Creating new tracker entry:', { user, type, date });

  try {
    const newTracker = new Tracker({ user, type, value, date });
    await newTracker.save();
    console.log('New tracker entry created:', newTracker._id);
    res.status(201).json(newTracker);
  } catch (error) {
    console.error('Error creating new tracker entry:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTrackerById = async (req, res) => {
  console.log('Fetching tracker entry by ID:', req.params.id);
  try {
    const tracker = await Tracker.findById(req.params.id);
    if (!tracker) {
      console.log('Tracker entry not found:', req.params.id);
      return res.status(404).json({ message: 'Tracker entry not found' });
    }
    console.log('Tracker entry fetched:', tracker._id);
    res.json(tracker);
  } catch (error) {
    console.error('Error fetching tracker by ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateTracker = async (req, res) => {
  console.log('Updating tracker entry by ID:', req.params.id);
  try {
    const updatedTracker = await Tracker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTracker) {
      console.log('Tracker entry not found for update:', req.params.id);
      return res.status(404).json({ message: 'Tracker entry not found' });
    }
    console.log('Tracker entry updated:', updatedTracker._id);
    res.json(updatedTracker);
  } catch (error) {
    console.error('Error updating tracker entry:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTracker = async (req, res) => {
  console.log('Deleting tracker entry by ID:', req.params.id);
  try {
    const tracker = await Tracker.findByIdAndDelete(req.params.id);
    if (!tracker) {
      console.log('Tracker entry not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Tracker entry not found' });
    }
    console.log('Tracker entry deleted:', req.params.id);
    res.json({ message: 'Tracker entry deleted' });
  } catch (error) {
    console.error('Error deleting tracker entry:', error.message);
    res.status(500).json({ message: error.message });
  }
};
