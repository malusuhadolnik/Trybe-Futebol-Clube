import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
// https://levelup.gitconnected.com/using-bcrypt-to-hash-and-compare-passwords-with-nodejs-and-mongodb-366ff80138b7
import Users from '../models/Users';
import ILogin from '../interfaces/ILogin';

export default class LoginService {
  model: ModelStatic<Users> = Users;

  async validateUser(loginInfo: ILogin) {
    const { email, password } = loginInfo;
    const credentials = await this.model.findOne({ where: { email } });

    if (!credentials) return { isValid: false };

    const isValid = bcrypt.compareSync(password, credentials?.dataValues.password);
    return { credentials, isValid };
  }

  async getUserByEmail(email: string) {
    const credentials = await this.model.findOne({ where: { email } });
    return credentials;
  }
}
