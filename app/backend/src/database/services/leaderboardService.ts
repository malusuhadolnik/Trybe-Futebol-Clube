// Obs: quando o método é estático, não precisamos de um construtor
// https://sequelize.org/docs/v6/core-concepts/raw-queries/
import { QueryTypes } from "sequelize";
import sequelize from '../models'



export default class LeaderboardService {  
  static async getLeaderboardInfo() {
    const [homeBoard] = await sequelize.query(homeLBQuery, { type: QueryTypes.SELECT })
    return homeBoard;
  }
}
  