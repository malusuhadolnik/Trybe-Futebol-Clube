import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';

const msg422 = 'It is not possible to create a match with two equal teams';

const validateNewMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const teamsService = new TeamsService();
  const htID = homeTeamId.toString();
  const atID = awayTeamId.toString();

  const findHomeTeam = await teamsService.getById(htID);
  const findAwayTeam = await teamsService.getById(atID);

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({ message: msg422 });
  }
  if (!findHomeTeam || !findAwayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
};

export default validateNewMatch;
