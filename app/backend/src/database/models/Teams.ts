import { Model, INTEGER, STRING } from 'sequelize'; // importamos os tipos direto do sequelize!
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string; // camel case porque vamos usar  underscored: true
}

Teams.init({
  id: { // exemplo do Course: intro ao TS dia 02, model com sequelize
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false, // No readme não diz se pode ser null ou não, então setei para false para garantir que não vai ter erros no futuro
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
