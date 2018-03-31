import mongoose from 'mongoose';
import validator from 'validator';
import findOrCreate from 'mongoose-find-or-create';

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
  facebookId: {
    type: String,
    required: true,
  }
});

UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);

export default User;
