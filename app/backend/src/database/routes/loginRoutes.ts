import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validatePassword from '../middlewares/validatePassword';
import validateEmail from '../middlewares/validateEmail';
// import AuthToken from '../middlewares/AuthToken';
import authenticateToken from '../middlewares/authToken';

const instaceOfLogin = new LoginController();
// const authToken = new AuthToken();
const loginRouter = Router();

loginRouter.post('/', validatePassword, validateEmail, (req, res) => {
  instaceOfLogin.validateCredentials(req, res);
});

loginRouter.get(
  '/role',
  authenticateToken,
  (req, res) =>
    instaceOfLogin.getRole(req, res),
);

export default loginRouter;
