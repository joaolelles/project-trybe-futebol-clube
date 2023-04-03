import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  _service: MatchesService;

  constructor(service: MatchesService) {
    this._service = service;
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const allMatches = await this._service.getAll(inProgress as string | undefined);
    return res.status(200).json(allMatches);
  };

  endMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  upMatchResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this._service.upMatchResult(homeTeamGoals, awayTeamGoals, Number(id));
    return res.status(200).json(result);
  };
}
