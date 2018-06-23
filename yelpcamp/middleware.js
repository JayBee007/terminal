/* eslint import/prefer-default-export: 0 */
/* eslint consistent-return: 0 */

export const isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

export const addUserToReq = (req, res, next) => {
  res.locals.user = req.user;
  next();
}
