/* eslint no-underscore-dangle: 0 */
/* eslint no-param-reassign:0 */
import express from 'express';

import Campground from '../models/campground';
import Comment from '../models/comment';

import { isLoggedIn } from '../middleware';

const router = express.Router({mergeParams: true});

router.get('/new', isLoggedIn, (req,res) => {

  Campground.findById(req.params.id, (err, campground) => {
    if(err) res.send(err).status(500);
    res.render('comments/new', {campground});
  });
})

router.post('/', isLoggedIn, (req,res) => {
  const { text } = req.body.comment;
  const { id } = req.params;

  Campground.findById(id, (err, campground) => {
    if(err) res.send(err).status(500);

    Comment.create({text}, (commentErr, comment) => {
      if(commentErr) res.send(err).status(500);
      comment.author.id = req.user._id;
      comment.author.username = req.user.username;
      comment.save();
      campground.comments.push(comment);
      campground.save();
      res.redirect(`/campgrounds/${campground._id}`)
    });

  });

});

router.get('/:comment_id/edit', (req,res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if(err) res.redirect('back');
    res.render('comments/edit', { campground_id: req.params.id, comment});
  });
});

router.put('/:comment_id', (req,res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
    if(err) res.redirect('back');
    res.redirect(`/campgrounds/${req.params.id}`);
  });
});


export default router;
