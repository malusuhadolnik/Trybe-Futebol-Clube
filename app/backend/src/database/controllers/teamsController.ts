// Aqui o raciocínio é muito parecido com o service:
// Nosso constructor vai iniciar a dependência, que é o TeamsService; -> Dica do Breno Lavalle, turma 25B
// E dentro da classe tbm entram os métodos que precisamos para lidar com as reqs e res
import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  public _teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this._teamsService = teamsService;
  }

  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    const allTeams = await this._teamsService.getAll();
    res.status(200).json(allTeams);
  };
}
