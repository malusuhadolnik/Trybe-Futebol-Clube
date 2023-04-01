import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validatePassword from '../middlewares/validatePassword';
import validateEmail from '../middlewares/validateEmail';

const instaceOfLogin = new LoginController();
const loginRouter = Router();

loginRouter.post('/', validatePassword, validateEmail, (req, res) => {
    instaceOfLogin.validateCredentials(req,res)
});

export default loginRouter;
