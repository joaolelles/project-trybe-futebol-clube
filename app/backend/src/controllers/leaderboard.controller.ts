import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderboard.service';

export default class LeaderBoardController {
  _service: LeaderBoardService;

  constructor(service: LeaderBoardService) {
    this._service = service;
  }

  createLeaderboard = async (req: Request, res: Response) => {
    const result = await this._service.createLeaderboard();
    return res.status(200).json(result);
  };
}
