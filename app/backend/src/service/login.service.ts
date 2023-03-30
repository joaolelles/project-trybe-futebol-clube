import bcrypt = require('bcryptjs');
import { ModelStatic } from 'sequelize';
import Users from '../database/models/userModel';

export default class LoginService {
  _model: ModelStatic<Users>;

  constructor(model: ModelStatic<Users>) {
    this._model = model;
  }

  login = async (email: string, password: string) => {
    const user = await this._model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const userPassword = bcrypt.compareSync(password, user.dataValues.password);
    if (userPassword) {
      const { password: _, ...userWithoutPassword } = user.dataValues;
      return userWithoutPassword;
    }
  };

  getRole = async (email: string) => {
    const user = await this._model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const { role } = user.dataValues;
    return role;
  };
}
