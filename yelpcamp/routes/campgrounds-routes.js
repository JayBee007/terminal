/* eslint array-callback-return: 0 */
/* eslint no-underscore-dangle: 0 */

import express from 'express';

import Campground from '../models/campground';

import { isLoggedIn } from '../middleware';

const router = express.Router();

// get all campgrounds
router.get('/', (req, res) => {
  Campground.find((err, campgrounds) => {
    if (err) res.json(err);
    res.render('campgrounds/index', { campgrounds  });
  });
});

// create new campground
router.post('/', isLoggedIn, (req, res) => {
  const { name, image, description } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const campground = new Campground({
    name,
    image,
    description,
    author
  });

  campground.save((err) => {
    if (err) res.send(err).status(500);
    res.redirect('campgrounds');
  });
});

// get new campground form
router.get('/new', isLoggedIn,  (req, res) => {
  res.render('campgrounds/new');
});

// get single campground
router.get('/:id', (req, res) => {
  // Adventure.findById(id, function (err, adventure) {});
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if(err) res.send(err).status(500);
    res.render('campgrounds/show', { campground });
  });
});

// edit single campground form
router.get('/:id/edit', (req,res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) res.send(err).status(500);
    res.render('campgrounds/edit', { campground });
  });
});

// update single campground
router.put('/:id', (req,res) => {
  const { name, image, description } = req.body;
  Campground.findByIdAndUpdate(req.params.id,{
    name,
    image,
    description
  }, (err, campground) => {
    if(err) res.send(err).status(500);
    res.redirect(`/campgrounds/${campground._id}`);
  })
});

// destroy single campground
router.delete('/:id', (req,res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err) res.send(err).status(500);
    res.redirect('/campgrounds');
  })
});

export default router;
