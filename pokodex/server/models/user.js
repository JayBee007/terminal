import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not a valid email`
    }
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

UserSchema.statics.findOrCreate = function(accessToken, refreshToken, profile, cb) {
  const User = this;
  console.log(profile);
  return this.findOne({'facebookProvider.id': profile.id}, function(err, user) {
    if(!user) {
      const newUser = new User({
        username: profile.username || 'Anonymous',
        email: profile.emails[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      })

      newUser.save(function(error, savedUser) {
        if(error) {
          return console.error(error);
        }
        return cb(null, savedUser);
      });
    }else {
      return cb(null, user)
    }
  })
}



const User = mongoose.model('User', UserSchema);

export default User;
