import { Model, INTEGER, STRING } from 'sequelize'; // importamos os tipos direto do sequelize!
import db from '.';

class Users extends Model {
  declare id: number;
  declare teamName: string; // camel case porque vamos usar  underscored: true
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
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;