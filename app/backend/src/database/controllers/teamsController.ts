import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async getAllTeams(_req: Request, res: Response): Promise<void> {
    const allTeams = await TeamsService.getAll();
    console.log(allTeams);
    res.status(200).json(allTeams);
  }
}
