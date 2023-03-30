import express = require('express');
import TeamsController from '../controllers/teams.controller';
import Teams from '../database/models/teamModel';
import TeamService from '../service/teams.service';

const teamsService = new TeamService(Teams);
const teamsController = new TeamsController(teamsService);

const router = express.Router();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getTeam);

export default router;
