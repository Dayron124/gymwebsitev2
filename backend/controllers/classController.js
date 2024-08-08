import Class from '../models/Class.js';

export const getAllClasses = async (req, res) => {
  console.log('Fetching all classes');
  try {
    const classes = await Class.find().sort({ date: -1 });
    console.log('Classes fetched:', classes.length);
    res.json(classes);
  } catch (error) {
    console.error('Error fetching all classes:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createClass = async (req, res) => {
  const { name, description, instructor, date } = req.body;
  console.log('Creating new class:', { name, instructor });

  try {
    const newClass = new Class({ name, description, instructor, date });
    await newClass.save();
    console.log('New class created:', newClass._id);
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating new class:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getClassById = async (req, res) => {
  console.log('Fetching class by ID:', req.params.id);
  try {
    const singleClass = await Class.findById(req.params.id);
    if (!singleClass) {
      console.log('Class not found:', req.params.id);
      return res.status(404).json({ message: 'Class not found' });
    }
    console.log('Class fetched:', singleClass._id);
    res.json(singleClass);
  } catch (error) {
    console.error('Error fetching class by ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  console.log('Updating class by ID:', req.params.id);
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      console.log('Class not found for update:', req.params.id);
      return res.status(404).json({ message: 'Class not found' });
    }
    console.log('Class updated:', updatedClass._id);
    res.json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  console.log('Deleting class by ID:', req.params.id);
  try {
    const singleClass = await Class.findByIdAndDelete(req.params.id);
    if (!singleClass) {
      console.log('Class not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Class not found' });
    }
    console.log('Class deleted:', req.params.id);
    res.json({ message: 'Class deleted' });
  } catch (error) {
    console.error('Error deleting class:', error.message);
    res.status(500).json({ message: error.message });
  }
};
