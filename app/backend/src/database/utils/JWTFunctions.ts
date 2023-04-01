// Script desenvolvido com base na mentoria estrututada "JWT com Typescript"
// ministrada pelo Coruja 
import * as Jwt from "jsonwebtoken"; 
import ILogin from "../interfaces/ILogin";

const JWT_SECRET = process.env.JWT_SECRET || 'mySecret';

const configJWT: Jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };// o signOptions serve para tipar o config

export const createJWT = (payload: Omit<ILogin, 'password'>) => {
  return Jwt.sign(payload, JWT_SECRET, configJWT);
}

export const verifyJWT = (token: string) => {
  console.log(token);
  return Jwt.verify(token, JWT_SECRET);
}