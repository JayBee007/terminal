import express from 'express';
import passport from 'passport';
import { authenticate, generateToken, sendToken } from '../middleware/token';
import { getCurrentUser, getOne } from '../middleware/currentUser';

const router = express.Router();

router.post('/facebook', passport.authenticate('facebook-token', { session: false}), (req, res, next) => {
  // if(err) {
  //   return res.status(err.oauthError.statusCode).json(err).end();
  // }
  if(!req.user) {
    return res.send(401, 'User Not Authenticated');
  }

  req.auth = {
    id: req.user.id
  };
  next();
},(error, req, res, next) => {
  if(error) {res.status(400).json({message: 'Auth Failed', error})}
}, generateToken, sendToken );


router.get('/me', authenticate, getCurrentUser, getOne);


router.get("/logout", (req,res) => {
  res.send("loggin out");
});

export default router;
