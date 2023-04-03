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
}
