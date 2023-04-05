// referências consultadas:
// https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
// https://sequelize.org/docs/v6/core-concepts/assocs/
// https://github.com/sequelize/sequelize/issues/13551
// https://medium.com/@edumarcelino/joins-com-sequelize-mysql-e-node-js-parte-1-bb70893a28b0
// https://stackoverflow.com/questions/72843425/what-happens-if-empty-object-is-passed-to-where-in-sequelizejs-query

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

  async filterByProgress(isInProgress: string):Promise<IMatch[]> {
    // é preciso tratar a variável isInProgress,
    // caso contrário ela retorna apenas os resultados falsos, mesmo que setada para true!
    // dica do Matesu Ramos, T25
    const progress = isInProgress === 'true';

    const filteredTeams = await this.model.findAll({
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
        required: false,
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
        required: false,
      }],
      where: { inProgress: progress },
    });
    return filteredTeams;
  }

  async setProgressToFalse(givenId: number) {
    const updated = await this.model.update({ inProgress: false }, { where: { id: givenId } });
    return updated;
  }

  async updateScore(givenId: number, homeGoals: number, awayGoals: number) {
    const update = await this.model.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id: givenId } },
    );
    return update;
  }
  
  async createNewmatch(homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number) {
      const newTeam = await this.model.create(
        { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }
    );
  }

}
