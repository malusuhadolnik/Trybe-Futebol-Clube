import { Request, Response } from 'express';
import LoginService from '../services/loginService';

const inspectBodyInfo = (email:string, password:string) => email && password; // exemplo da aula do zambs, lecture/backend 6.4
export default class LoginController {
    public service: LoginService;
  
    constructor() {
      this.service = new LoginService();
    }
    
    async validateCredentials(req: Request, res: Response): Promise<Response> {
      const { email, password } = req.params;
      const token = await this.service.validateUser(email, password);
      
      if (token) {
        return res.status(200).json({ token });
      }
      return res.status(400).json({ message: 'All fields must be filled' });
    }
  }