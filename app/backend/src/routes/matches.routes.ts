import express = require('express');
import MatchesController from '../controllers/matches.controller';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamModel';
import Matcheservice from '../service/matches.service';
import authToken from '../middlewares/validateToken';

const matchesService = new Matcheservice(Matches, Teams);
const matchesController = new MatchesController(matchesService);

const router = express.Router();

router.patch('/:id/finish', authToken, matchesController.endMatch);
router.patch('/:id', authToken, matchesController.upMatchResult);
router.get('/', matchesController.getAll);
router.post('/', authToken, matchesController.postNewMatch);

export default router;
