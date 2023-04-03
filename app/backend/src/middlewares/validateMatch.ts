import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/teamModel';

const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res
      .status(422).json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const homeTeam = await Teams.findByPk(homeTeamId);
  const awayTeam = await Teams.findByPk(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateTeams;
