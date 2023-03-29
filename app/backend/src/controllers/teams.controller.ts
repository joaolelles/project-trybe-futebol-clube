import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

const getAll = async (_req: Request, res: Response) => {
  const allTeams = await teamsService.getAll();
  return res.status(200).json(allTeams);
};

const getTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamsService.getTeam(Number(id));
  return res.status(200).json(team);
};

export default {
  getAll,
  getTeam,
};
