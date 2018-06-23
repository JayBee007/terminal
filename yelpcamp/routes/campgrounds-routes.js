/* eslint array-callback-return: 0 */

import express from 'express';

import Campground from '../models/campground';

const router = express.Router();

router.get('/', (req, res) => {
  Campground.find((err, campgrounds) => {
    if (err) res.json(err);
    res.render('index', { campgrounds });
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
  res.render('new');
});

router.get('/:id', (req, res) => {
  // Adventure.findById(id, function (err, adventure) {});
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if(err) res.send(err).status(500);
    res.render('show', { campground});
  });
});

export default router;
