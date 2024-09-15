import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Access denied 12' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
