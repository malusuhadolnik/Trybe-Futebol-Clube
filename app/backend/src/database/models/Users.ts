import { Model, INTEGER, STRING } from 'sequelize'; // importamos os tipos direto do sequelize!
import db from '.';

class Users extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: { // exemplo do Course: intro ao TS dia 02, model com sequelize
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: STRING,
    allowNull: false, 
  },
  role: {
    type: STRING,
    allowNull: false, 
  },
  email: {
    type: STRING,
    allowNull: false, 
  },
  password: {
    type: STRING,
    allowNull: false, 
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;