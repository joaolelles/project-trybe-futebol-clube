import bcrypt = require('bcryptjs');
import Users from '../database/models/userModel';

const login = async (email: string, password: string) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return null;
  }
  const userPassword = bcrypt.compareSync(password, user.dataValues.password);
  if (userPassword) {
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  }
};

const getRole = async (email: string) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return null;
  }
  const { role } = user.dataValues;
  return role;
};

export default {
  login,
  getRole,
};