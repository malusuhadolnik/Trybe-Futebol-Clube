import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getHomeBoard(_req: Request, res: Response): Promise<void> {
    const homeBoardData = await LeaderboardService.getHomeLeaderboard();
    res.status(200).json(homeBoardData);
  }

  static async getAwayBoard(_req: Request, res: Response): Promise<void> {
    const awayBoardData = await LeaderboardService.getAwayLeaderboard();
    res.status(200).json(awayBoardData);
  }
}
