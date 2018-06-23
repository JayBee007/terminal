/* eslint array-callback-return: 0 */
/* eslint no-underscore-dangle: 0 */

import express from 'express';
import passport from 'passport';

import User from '../models/user';

const router = express.Router();

router.get('/login', (req,res) => {

});


router.get('/signup', (req,res) => {
  res.render("auth/signup");
});

router.post('/signup', (req,res) => {
  const {username, password} = req.body;

  User.register(new User({username}), password, (err) => {
    if(err) res.send(err).status(500);
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    })
  })
});


router.get('/logout', (req,res) => {

});

export default router;
