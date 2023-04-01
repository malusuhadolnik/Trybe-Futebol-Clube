import { NextFunction, Request, Response } from 'express';

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body; 
    const theLength = password.length; 

    if (!password) return res.status(400).json({ "message": "All fields must be filled" });
    if (theLength < 6) return res.status(401).json({ "message": "Invalid email or password" });

    return next();
}

export default validatePassword;

// precisa ter sido passada
// { "message": "All fields must be filled" }, status 400
// Senhas com formato inválido: com um tamanho menor do que 6 caracteres; 
// { "message": "Invalid email or password" }, status 401
// Senhas com formato válido, mas não cadastradas no banco; OK