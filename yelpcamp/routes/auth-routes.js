/* eslint array-callback-return: 0 */
/* eslint no-underscore-dangle: 0 */

import express from 'express';
import passport from 'passport';

import User from '../models/user';

const router = express.Router();

router.get('/login', (req,res) => {
  res.render('auth/login');
});


router.post('/login',
  passport.authenticate('local',
    { successRedirect: '/campgrounds',
      failureRedirect: '/auth/login'
    })
);

router.get('/signup', (req,res) => {
  res.render('auth/signup');
});

router.post('/signup', (req,res) => {
  const {username, password} = req.body;

  User.register(new User({username}), password, (err) => {
    if(err) {
      req.flash('error', err.message);
      res.redirect('back');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to YelpCamp');
      res.redirect('/campgrounds');
    })
  })
});

router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/');
});

export default router;
