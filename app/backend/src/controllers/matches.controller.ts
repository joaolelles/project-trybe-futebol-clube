import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  _service: MatchesService;

  constructor(service: MatchesService) {
    this._service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    const allMatches = await this._service.getAll();
    return res.status(200).json(allMatches);
  };
}
