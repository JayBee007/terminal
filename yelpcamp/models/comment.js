import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
