import Forum from '../models/Forum.js';

export const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.json(forums);
  } catch (error) {
    console.error(`Error fetching forums: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createForum = async (req, res) => {
  const { title, description, user } = req.body;

  try {
    const newForum = new Forum({ title, description, user });
    await newForum.save();
    res.status(201).json(newForum);
  } catch (error) {
    console.error(`Error creating forum: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getForumById = async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.json(forum);
  } catch (error) {
    console.error(`Error fetching forum by id: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateForum = async (req, res) => {
  try {
    const updatedForum = await Forum.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedForum);
  } catch (error) {
    console.error(`Error updating forum: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteForum = async (req, res) => {
  try {
    await Forum.findByIdAndDelete(req.params.id);
    res.json({ message: 'Forum deleted' });
  } catch (error) {
    console.error(`Error deleting forum: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
