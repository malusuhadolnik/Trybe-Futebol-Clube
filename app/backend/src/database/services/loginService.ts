import { ModelStatic } from "sequelize";
import Users from "../models/Users";
import ILogin from "../interfaces/ILogin";

export default class LoginService {
    model: ModelStatic<Users> = Users;
  
    async validateUser(email: string, password:string):Promise<ILogin | null> { // criar essa interface
      const credentials = await this.model.findOne({ where: { email, password }});
      return credentials;
    }
  };
