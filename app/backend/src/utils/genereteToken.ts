import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'batatinha';

const genereteToken = (param: object) => {
  const token = jwt.sign(param, secret, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

export default genereteToken;
