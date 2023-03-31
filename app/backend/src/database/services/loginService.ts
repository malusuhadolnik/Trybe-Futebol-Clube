import { ModelStatic } from "sequelize";
import Users from "../models/Users";
import { createJWT } from "../utils/JWTFunctions";

export default class LoginService {
    model: ModelStatic<Users> = Users;
  
    async validateUser(email: string, password:string){ 
      const credentials = await this.model.findOne({ where: { email, password }});
      return createJWT(credentials?.dataValues.email);
    }
  };
