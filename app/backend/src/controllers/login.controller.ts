import { Request, Response } from 'express';
import genereteToken from '../utils/genereteToken';
import LoginService from '../service/login.service';

export default class LoginController {
  _service: LoginService;

  constructor(service: LoginService) {
    this._service = service;
  }

  postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this._service.postLogin(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user) {
      const token = genereteToken(user);
      return res.status(200).json({ token });
    }
  };

  getRole = async (req: Request, res: Response) => {
    const { payload } = req.body.user;
    const { email } = payload;
    const role = await this._service.getRole(email);
    return res.status(200).json({ role });
  };
}
