import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getAll = async (_req: Request, res: Response) => {
  const allTeams = await teamsService.getAll();
  return res.status(200).json(allTeams);
};

export default {
  getAll,
};
