import express = require('express');
import MatchesController from '../controllers/matches.controller';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamModel';
import Matcheservice from '../service/matches.service';

const matchesService = new Matcheservice(Matches, Teams);
const matchesController = new MatchesController(matchesService);

const router = express.Router();

router.get('/', matchesController.getAll);

export default router;
