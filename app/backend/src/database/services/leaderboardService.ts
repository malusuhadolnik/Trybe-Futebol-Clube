// Obs1: quando o método é estático, não precisamos de um construtor
// Obs2: As queries serão deenvolvidas em outro arquivo por 2 motvos: facilidade de leitura,
// e porque deu um erro avisando que havia parâmetros em excesso.
// https://sequelize.org/docs/v6/core-concepts/raw-queries/

import { QueryTypes } from 'sequelize';
import sequelize from '../models';
import { homeLBQuery, awayLBQuery } from '../utils/homeLBQuery';
import { ILeaderboard } from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  static async getHomeLeaderboard():Promise<ILeaderboard[]> {
    const homeBoard = await sequelize.query(homeLBQuery, { type: QueryTypes.SELECT });
    return homeBoard as ILeaderboard[];
  }

  static async getAwayLeaderboard():Promise<ILeaderboard[]> {
    const awayBoard = await sequelize.query(awayLBQuery, { type: QueryTypes.SELECT });
    return awayBoard as ILeaderboard[];
  }
}
