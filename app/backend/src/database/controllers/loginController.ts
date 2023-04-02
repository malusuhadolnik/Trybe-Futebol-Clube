import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import { createJWT } from '../utils/JWTFunctions';
import IRequest from '../interfaces/IRequest';

export default class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  async validateCredentials(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const { credentials, isValid } = await this.service.validateUser(req.body);
    console.log(credentials?.dataValues);
    if (credentials && isValid === true) {
      const token = createJWT({ email }); // obs1
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  async getRole(req:IRequest, res: Response): Promise<Response> {
    const userEmail = req.user?.email;
    if (userEmail) {
      const credentials = await this.service.getUserByEmail(userEmail);
      return res.status(200).json({ role: credentials?.role });
    }
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

// obs1: ao passar somente o email como paraâmetro, retornava o seguinte erro no thunder:
// invalid expiresIn option for string payload
// encontrei no stackoverflow a seguinte explicação: Your payload needs to be an object otherwise it's treated as a string.
// por isso passei o email no formato de objeto. aí funcionou;
// Fonte: https://stackoverflow.com/questions/66449908/error-invalid-expiresin-option-for-string-payload
