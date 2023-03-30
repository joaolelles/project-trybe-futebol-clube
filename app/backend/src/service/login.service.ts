import bcrypt = require('bcryptjs');
import Users from '../database/models/userModel';

const login = async (emailw: string, password: string) => {
  const user = await Users.findOne({ where: { email: emailw } });
  if (!user) {
    return null;
  }
  const userPassword = bcrypt.compareSync(password, user.dataValues.password);
  if (userPassword) {
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  }
};

export default {
  login,
};
