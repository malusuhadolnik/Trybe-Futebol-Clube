// Referências: https://flaviocopes.com/express-get-query-variables/
import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress) {
      const filteredMatches = await this.service.filterByProgress(inProgress as string);// string como tipo foi sugerido pelo vscode
      return res.status(200).json(filteredMatches);
    }

    const allMatches = await this.service.getAllMatches();
    return res.status(200).json(allMatches);
  }

  async setProgressToF(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const idAsNumber = Number(id);
    const updated = await this.service.setProgressToFalse(idAsNumber);
    if (updated) {
      return res.status(200).json({ message: 'Finished' });
    }
    return res.status(500).json({ message: 'Something went wrong' });
  }

  async updateScore(req:Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const idAsNumber = Number(id);
    const homeGoals = Number(homeTeamGoals);
    const awayGoals = Number(awayTeamGoals);

    const newScore = await this.service.updateScore(idAsNumber, homeGoals, awayGoals);
    if (newScore) {
      return res.status(200).json({ message: 'Update succeeded' });
    }
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
