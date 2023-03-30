import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'batatinha';

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(authorization, secret);
    req.body.user = { payload };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authToken;
