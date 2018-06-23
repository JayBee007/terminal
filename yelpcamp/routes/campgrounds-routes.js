/* eslint array-callback-return: 0 */
/* eslint no-underscore-dangle: 0 */

import express from 'express';

import Campground from '../models/campground';
import Comment from '../models/comment';

const router = express.Router();

router.get('/', (req, res) => {
  Campground.find((err, campgrounds) => {
    if (err) res.json(err);
    res.render('campgrounds/index', { campgrounds });
  });
});


router.post('/', (req, res) => {
  const { name, image, description } = req.body;
  const campground = new Campground({
    name,
    image,
    description,
  });
  campground.save((err) => {
    if (err) res.send(err).status(500);
    res.redirect('campgrounds');
  });
});

router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {
  // Adventure.findById(id, function (err, adventure) {});
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if(err) res.send(err).status(500);
    res.render('campgrounds/show', { campground});
  });
});


// comments routes

router.get('/:id/comments/new', (req,res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) res.send(err).status(500);
    res.render('comments/new', {campground});
  });
})

router.post('/:id/comments', (req,res) => {
  const { author, text } = req.body.comment;
  const { id } = req.params;

  Campground.findById(id, (err, campground) => {
    if(err) res.send(err).status(500);

    Comment.create({author,text}, (commentErr, comment) => {
      if(commentErr) res.send(err).status(500);
      campground.comments.push(comment);
      campground.save();
      res.redirect(`/campgrounds/${campground._id}`)
    });

  });

});

export default router;
