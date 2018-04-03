import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

import User from '../models/user';

passport.use(new FacebookTokenStrategy({

  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,

  },(accessToken, refreshToken, profile, callback) => {

      User.findOrCreate(accessToken, refreshToken, profile, (err,user) => {
        return callback(err,user)
      });
  })
);
