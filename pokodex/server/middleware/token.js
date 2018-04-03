import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

export const createToken = (auth) => {
  const expiresIn = 60*120;
  const secret = process.env.JWT_KEY;
  const token = jwt.sign({id:auth.id}, secret, {
    expiresIn
  });
  return token;
}

export const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  next();
}

export const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
}

export const authenticate = expressJwt({
  secret: process.env.JWT_KEY,
  requestProperty: 'auth',
  getToken: function(req) {

    if(req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }

    return null;
  }
});
