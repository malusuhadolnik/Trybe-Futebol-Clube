// Script desenvolvido com base na mentoria estrututada "JWT com Typescript"
// ministrada pelo Coruja
import * as Jwt from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

const JWT_SECRET = process.env.JWT_SECRET || 'mySecret';

const config: Jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };// o signOptions serve para tipar o config

export const createJWT = (data: Omit<ILogin, 'password'>) => Jwt.sign(data, JWT_SECRET, config);

export const verifyJWT = (token: string) => Jwt.verify(token, JWT_SECRET);
