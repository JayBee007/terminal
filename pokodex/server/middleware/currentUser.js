import User from '../models/user';

export const getCurrentUser = (req, res, next) => {
  User.findById(req.auth.id, (err,user) => {
    if(err) {
      next(err);
    }else {
      req.user = user;
      next();
    }
  })
};

export const getOne = (req, res) => {
  const user = req.user.toObject();
  delete user['facebookProvider'];
  delete user['__v'];

  res.json(user);
};
