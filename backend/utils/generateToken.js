import jwt from 'jsonwebtoken';

const generateTestToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateTestToken;
