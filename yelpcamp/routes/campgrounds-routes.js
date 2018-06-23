/* eslint array-callback-return: 0 */
/* eslint no-underscore-dangle: 0 */

import express from 'express';

import Campground from '../models/campground';

import { isLoggedIn } from '../middleware';

const router = express.Router();

router.get('/', (req, res) => {
  Campground.find((err, campgrounds) => {
    if (err) res.json(err);
    res.render('campgrounds/index', { campgrounds  });
  });
});


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

router.get('/new', isLoggedIn,  (req, res) => {
  res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {
  // Adventure.findById(id, function (err, adventure) {});
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if(err) res.send(err).status(500);
    res.render('campgrounds/show', { campground });
  });
});

export default router;
