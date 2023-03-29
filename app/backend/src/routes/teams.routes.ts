import express = require('express');
import teamsController from '../controllers/teams.controller';

const router = express.Router();

router.get('/', teamsController.getAll);

export default router;
