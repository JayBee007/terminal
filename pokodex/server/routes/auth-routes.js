import express from 'express';
import passport from 'passport';
import { authenticate, generateToken, sendToken } from '../middleware/token';
import { getCurrentUser, getOne } from '../middleware/currentUser';

const router = express.Router();

router.post('/facebook', passport.authenticate('facebook-token', { session: false}), (req, res, next) => {
  if(!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id
  };
  next();
}, generateToken, sendToken );


router.get('/me', authenticate, getCurrentUser, getOne);


router.get("/logout", (req,res) => {
  res.send("loggin out");
});

export default router;


// router.post('/facebook', passport.authenticate('facebook-token', {
//   session: false,
//   scope: ["email"]
// }));

// router.get('/facebook/redirect', passport.authenticate('facebook', { session: false}), (req,res) => {
//   const accessToken = generateToken(req.user.id);
//   res.send(accessToken);
// });
