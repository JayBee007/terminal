import express from "express";
const router = express.Router();

import Campground from "../models/campground.js";

router.get("/", (req,res) => {
  console.log("/campgrounds get")
  Campground.find((err, campgrounds) => {
    if(err) res.json(err);
    res.render("campgrounds", { campgrounds });
  })
});


router.post("/", (req,res) => {
  const { name, image } = req.body;
  const campground = new Campground({
    name,
    image
  });
  campground.save((err, campground) => {
    if(err) console.log(err);
    res.redirect("campgrounds");
  })

});


router.get("/new", (req,res) => {
  res.render("new");
});


export default router;
