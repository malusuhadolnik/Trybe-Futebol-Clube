import { NextFunction, Request, Response } from 'express';

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const theLength = password.length;

  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  if (theLength < 6) return res.status(401).json({ message: 'Invalid email or password' });

  return next();
};

export default validatePassword;
