// Requisito desenvolvido de acordo com a mentoria  JWT com Typescript
import { NextFunction, Response } from 'express';
import { verifyJWT } from '../utils/JWTFunctions';
import IRequest from '../interfaces/IRequest';
import ILogin from '../interfaces/ILogin';

const authenticateToken = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = verifyJWT(authorization);
    // vamos estender o Request, através de uma interface, para que possamos criar nele uma nova propriedade, user,
    // que faz a tipagem da informação que queremos armazenar
    req.user = decoded as Omit<ILogin, 'password'>; // o lint pede a tipagem do decoded
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authenticateToken;
