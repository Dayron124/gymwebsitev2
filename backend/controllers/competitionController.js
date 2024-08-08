import Competition from '../models/Competition.js';

export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompetition = async (req, res) => {
  const { name, date, description } = req.body;

  try {
    const newCompetition = new Competition({ name, date, description });
    await newCompetition.save();
    res.status(201).json(newCompetition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompetition = async (req, res) => {
  try {
    const updatedCompetition = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompetition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompetition = async (req, res) => {
  try {
    await Competition.findByIdAndDelete(req.params.id);
    res.json({ message: 'Competition deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
