import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

import User from '../models/user';

import {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} from '../config/keys';

passport.use(new FacebookTokenStrategy({

  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,

  },(accessToken, refreshToken, profile, callback) => {

      User.findOrCreate(accessToken, refreshToken, profile, (err,user) => {
        return callback(null,user)
      });
  })
);
