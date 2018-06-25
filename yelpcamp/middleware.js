/* eslint import/prefer-default-export: 0 */
/* eslint consistent-return: 0 */
/* eslint no-underscore-dangle: 0 */

import Campground from './models/campground';

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

export const checkCampgroundOwnership = (req,res,next) => {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if(err) {
        res.redirect('back');
      }else if(campground.author.id.equals(req.user._id)) {
          next();
      }else {
          res.redirect('back');
      }
    });
  }else {
    res.redirect('back');
  }
}
