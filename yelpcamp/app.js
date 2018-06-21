import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import "./db";
import Campground from "./models/campground";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req,res) => {
  res.render("landing");
});


app.post("/campgrounds", (req,res) => {
  campgrounds.push(req.body);
  res.redirect("campgrounds");
});


app.get("/campgrounds", (req,res) => {
  Campground.find((err, campgrounds) => {
    if(err) res.json(err);
    res.render("campgrounds", { campgrounds });
  })
});

app.get("/campgrounds/new", (req,res) => {
  res.render("new");
});



app.listen(4000, () => {
  console.log('app running');
});
