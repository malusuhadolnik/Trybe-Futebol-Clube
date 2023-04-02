import { Request } from 'express';
import ILogin from './ILogin';

interface IRequest extends Request {
  user?: Omit<ILogin, 'password'>;
}

export default IRequest;
