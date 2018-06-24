/* eslint no-console: 0 */
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/yelpcamp");

const db = mongoose.connection;

db.on("error", () => {
  console.error("connection error");
});

db.once("open", () => {
  console.log("db connection establisted");
});
