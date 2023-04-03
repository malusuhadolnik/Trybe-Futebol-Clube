// retornar os dados da tabela Matches, substituindo home e away team_id pelo nome do time,
// nome este que está na tabela Teams.

// referências consultadas:
// https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
// https://sequelize.org/docs/v6/core-concepts/assocs/
// https://github.com/sequelize/sequelize/issues/13551
// https://medium.com/@edumarcelino/joins-com-sequelize-mysql-e-node-js-parte-1-bb70893a28b0

import { ModelStatic } from 'sequelize';
import Matches from '../models/Matches';
import IMatch from '../interfaces/IMatch';
import Teams from '../models/Teams';

export default class MatchesService {
  model: ModelStatic<Matches> = Matches;

  async getAllMatches():Promise<IMatch[]> {
    const allTeams = await this.model.findAll({
      include: [{
        model: Teams,
        as: 'homeTeam', // este é o alias da chave
        attributes: ['teamName'], // a coluna que queremos
        required: false, // left join
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
        required: false,
      }],
    });
    return allTeams;
  }
}
