import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getHomeBoard(_req: Request, res: Response): Promise<void> {
      const homeBoardData = await LeaderboardService.getHomeLeaderboard();
      res.status(200).json(homeBoardData);
    }
}