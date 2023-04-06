import express = require('express');
import LeaderBoardController from '../controllers/leaderboard.controller';
import LeaderBoardService from '../service/leaderboard.service';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamModel';

const leaderboardService = new LeaderBoardService(Teams, Matches);
const leaderboardController = new LeaderBoardController(leaderboardService);

const router = express.Router();

router.get('/home', leaderboardController.homeCreateLeaderboard);
router.get('/away', leaderboardController.awayCreateLeaderboard);
router.get('/', leaderboardController.geralCreateLeaderboard);

export default router;
