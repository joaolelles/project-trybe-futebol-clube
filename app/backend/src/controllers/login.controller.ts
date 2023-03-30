import { Request, Response } from 'express';
import genereteToken from '../utils/genereteToken';
import loginService from '../service/login.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginService.login(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (user) {
    const token = genereteToken(user);
    return res.status(200).json({ token });
  }
};

const getRole = async (req: Request, res: Response) => {
  const { payload } = req.body.user;
  const { email } = payload;
  const role = await loginService.getRole(email);
  return res.status(200).json({ role });
};

export default {
  login,
  getRole,
};
