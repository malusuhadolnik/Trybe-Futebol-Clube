import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validatePassword from '../middlewares/validatePassword';

const instaceOfLogin = new LoginController();
const loginRouter = Router();

loginRouter.post('/', validatePassword, (req, res) => instaceOfLogin.validateCredentials(req,res));

export default loginRouter;
