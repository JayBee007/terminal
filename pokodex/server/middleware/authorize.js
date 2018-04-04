import User from '../models/user';

const authorize = (req, res, next) => {
  const token = req.header('x-auth-token');

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(e);
  })
}

export default authorize;
