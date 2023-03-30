import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  async getAllTeams(_req: Request, res: Response): Promise<void> {
    const allTeams = await this.service.getAll();
    console.log(allTeams);
    res.status(200).json(allTeams);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const targetTeam = await this.service.getById(id);
    res.status(200).json(targetTeam);
  }
}
