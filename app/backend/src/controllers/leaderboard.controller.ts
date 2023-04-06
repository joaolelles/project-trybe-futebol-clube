import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderboard.service';

export default class LeaderBoardController {
  _service: LeaderBoardService;

  constructor(service: LeaderBoardService) {
    this._service = service;
  }

  geralCreateLeaderboard = async (_req: Request, res: Response) => {
    const result = await this._service.geralCreateLeaderboard();
    return res.status(200).json(result);
  };

  homeCreateLeaderboard = async (_req: Request, res: Response) => {
    const result = await this._service.homeDreateLeaderboard();
    return res.status(200).json(result);
  };

  awayCreateLeaderboard = async (_req: Request, res: Response) => {
    const result = await this._service.awayCreateLeaderboard();
    return res.status(200).json(result);
  };
}
