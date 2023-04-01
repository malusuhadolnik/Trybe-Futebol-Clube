import { NextFunction, Request, Response } from 'express';

const regex = /\S+@\S+\.\S+/;

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email} = req.body; 
    const isFormatValid = regex.test(email);

    if (!email) return res.status(400).json({ "message": "All fields must be filled" });
    if (!isFormatValid) return res.status(401).json({ "message": "Invalid email or password" });

    return next();
};

export default validateEmail;