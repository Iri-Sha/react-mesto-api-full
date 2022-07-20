const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET_KEY = 'some-secret-key';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies) {
    return new AuthorizationError('Необходима авторизация');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
