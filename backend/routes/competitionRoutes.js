import express from 'express';
import { getAllCompetitions, createCompetition, getCompetitionById, updateCompetition, deleteCompetition } from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', getAllCompetitions);
router.post('/', createCompetition);
router.get('/:id', getCompetitionById);
router.put('/:id', updateCompetition);
router.delete('/:id', deleteCompetition);

export default router;
