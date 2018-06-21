import express from "express";
import morgan from "morgan";


const app = express();

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.get("/", (req,res) => {
  res.render("landing");
});


app.get("/campgrounds", (req,res) => {
  const campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f9c471a7eab0bd_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104497f9c471a7eab0bd_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db80d2cfd053ed1584d05fb1d4e97e07ee3d21cac104497f9c471a7eab0bd_340.jpg"},
  ]
  res.render("campgrounds", { campgrounds });
});



app.listen(4000, () => {
  console.log('app running');
});
