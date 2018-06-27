/* eslint import/prefer-default-export: 0 */
/* eslint consistent-return: 0 */
/* eslint no-underscore-dangle: 0 */

import Campground from './models/campground';
import Comment from './models/comment';

export const isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please login.');
  res.redirect('/auth/login');
}

export const addUserToReq = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
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

export const checkCommentOwnership = (req,res,next) => {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if(err) {
        req.flash('error', 'Permission denied');
        res.redirect('back');
      }else if(comment.author.id.equals(req.user._id)) {
          next();
      }else {
          req.flash('error', 'Something went wrong!');
          res.redirect('back');
      }
    });
  }else {
    req.flash('error', 'Please login');
    res.redirect('back');
  }
}
