import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: { // exemplo do Course: intro ao TS dia 02, model com sequelize
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id', // obs.: o typescrypt não permitiu a inserção de uma foreign key!
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: true,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: true,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: true,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});
// sobre a associação entre tabelas:
// um time pode jogar várias partidas (hasMany); ao passo que uma partida é entre dois times
// ou seja: uma partida pertence à dois times.
// As declarações de associations devem ficar concentradas em apenas uma das entidades da relação.
// seguindo exemplo da aula Intro ao TS dia 02 Tipagem estática e generics:
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId' as 'teamId' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId' as 'teamId' });

Teams.hasMany(Matches, { foreignKey: 'homeTeamId' as 'teamId' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId' as 'teamId' });

export default Matches;
