import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  author: String
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
