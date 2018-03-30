import mongoose from 'mongoose';
import validator from 'validator';

const User = mongoose.model('User', {
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
})

export default User;
