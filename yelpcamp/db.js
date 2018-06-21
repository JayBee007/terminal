import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/yelpcamp");

const db = mongoose.connection;

db.on("error", () => {
  console.error("connection error");
});

db.once("open", () => {
  console.log("db connection establisted");
});
