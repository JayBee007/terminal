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
router.get('/:id/edit', isLoggedIn, (req,res) => {
  Campground.findByUserId(req.params.id, req.user._id)
    .then(campground => {
      res.render('campgrounds/edit', { campground });
    })
    .catch(() => {
      res.redirect(`/campgrounds/${req.params.id}`);
    });
});

// update single campground
router.put('/:id', isLoggedIn, (req,res) => {
  const { name, image, description } = req.body;
  Campground.findByUserId(req.params.id, req.user._id)
    .then(() => {
      Campground.findByIdAndUpdate(req.params.id,{ name, image, description},(err, campground) => {
        if(err) res.send(err).status(500);
        res.redirect(`/campgrounds/${campground._id}`);
      })
    })
    .catch(() => {
      res.redirect('back');
    });

});

// destroy single campground
router.delete('/:id', isLoggedIn, (req,res) => {
  Campground.findByUserId(req.params.id, req.user._id)
    .then(() => {
      Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) res.send(err).status(500);
        res.redirect('/campgrounds');
      })
    })
    .catch(() => {
      res.redirect('back');
    })
});

export default router;
