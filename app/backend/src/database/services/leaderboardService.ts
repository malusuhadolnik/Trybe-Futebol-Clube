// Obs1: quando o método é estático, não precisamos de um construtor
// Obs2: As queries serão deenvolvidas em outro arquivo por 2 motvos: facilidade de leitura,
// e porque deu um erro avisando que havia parâmetros em excesso.
// https://sequelize.org/docs/v6/core-concepts/raw-queries/

import { QueryTypes } from 'sequelize';
import sequelize from '../models';
import { homeLBQuery } from '../utils/homeLBQuery';

export default class LeaderboardService {
  static async getHomeLeaderboard() {
    const [homeBoard] = await sequelize.query(homeLBQuery, { type: QueryTypes.SELECT });
    return homeBoard;
  }
}
