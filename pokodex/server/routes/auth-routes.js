import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', {
  scope: ["email"]
}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req,res) => {
  // TODO decide what to do with regards to reactjs
  res.send("logged");
});

router.get("/logout", (req,res) => {
  res.send("loggin out");
})

export default router;
