import Competition from '../models/Competition.js';

export const getAllCompetitions = async (req, res) => {
  console.log('Fetching all competitions');
  try {
    const competitions = await Competition.find().sort({ date: -1 });
    console.log('Competitions fetched:', competitions.length);
    res.json(competitions);
  } catch (error) {
    console.error('Error fetching all competitions:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createCompetition = async (req, res) => {
  const { name, description, date, location } = req.body;
  console.log('Creating new competition:', { name, date });

  try {
    const newCompetition = new Competition({ name, description, date, location });
    await newCompetition.save();
    console.log('New competition created:', newCompetition._id);
    res.status(201).json(newCompetition);
  } catch (error) {
    console.error('Error creating new competition:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCompetitionById = async (req, res) => {
  console.log('Fetching competition by ID:', req.params.id);
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      console.log('Competition not found:', req.params.id);
      return res.status(404).json({ message: 'Competition not found' });
    }
    console.log('Competition fetched:', competition._id);
    res.json(competition);
  } catch (error) {
    console.error('Error fetching competition by ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateCompetition = async (req, res) => {
  console.log('Updating competition by ID:', req.params.id);
  try {
    const updatedCompetition = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompetition) {
      console.log('Competition not found for update:', req.params.id);
      return res.status(404).json({ message: 'Competition not found' });
    }
    console.log('Competition updated:', updatedCompetition._id);
    res.json(updatedCompetition);
  } catch (error) {
    console.error('Error updating competition:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompetition = async (req, res) => {
  console.log('Deleting competition by ID:', req.params.id);
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);
    if (!competition) {
      console.log('Competition not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Competition not found' });
    }
    console.log('Competition deleted:', req.params.id);
    res.json({ message: 'Competition deleted' });
  } catch (error) {
    console.error('Error deleting competition:', error.message);
    res.status(500).json({ message: error.message });
  }
};
