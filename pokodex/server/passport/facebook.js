import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

import User from '../models/user';

import {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} from '../config/keys';

passport.serializeUser((user,cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id,cb) => {
  User.findById({_id:id}, (err, user) => {
    if(err) return console.error(err);
    cb(null, user);
  })
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:3000/auth/facebook/redirect",
    profileFields: ['id', 'emails', 'name']
  }, (accessToken, refreshToken, profile, callback) => {
      const {id, username, emails } = profile;
      const email = emails[0].value;
      const userName = username || 'Anonymous';

    User.findOrCreate({ facebookId: id, email, username: userName}, (err,user) => {
      if(err) return console.error(err);
      callback(null, user);
    });

  })
)



// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));
