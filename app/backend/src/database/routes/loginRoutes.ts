import { Router } from 'express';
import LoginController from '../controllers/loginController';

const instaceOfLogin = new LoginController();
const loginRouter = Router();

loginRouter.post('/', (req, res) => instaceOfLogin.validateCredentials(req,res));

export default loginRouter;
