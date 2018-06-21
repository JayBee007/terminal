import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

let campgrounds = [
  {name: "Salmon Creek", image: "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f9c471a7eab0bd_340.jpg"},
  {name: "Granite Hill", image: "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104497f9c471a7eab0bd_340.jpg"},
  {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db80d2cfd053ed1584d05fb1d4e97e07ee3d21cac104497f9c471a7eab0bd_340.jpg"},
]

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
  res.render("campgrounds", { campgrounds });
});

app.get("/campgrounds/new", (req,res) => {
  res.render("new");
});



app.listen(4000, () => {
  console.log('app running');
});
