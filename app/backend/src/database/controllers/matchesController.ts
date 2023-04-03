import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  async getAllMatches(_req: Request, res: Response): Promise<void> {
    const allMatches = await this.service.getAllMatches();
    console.log(allMatches);
    res.status(200).json(allMatches);
  }
}
