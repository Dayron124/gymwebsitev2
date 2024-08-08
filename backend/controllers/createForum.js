import Forum from '../models/Forum.js';

export const createForum = async (req, res) => {
  const { title, description, user } = req.body;

  try {
    // Ensure all necessary fields are provided
    if (!title || !description || !user) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newForum = new Forum({ title, description, user });
    await newForum.save();
    res.status(201).json(newForum);
  } catch (error) {
    console.error(`Error creating forum: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
