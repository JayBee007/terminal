import mongoose from "mongoose";

const CampgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model('Campground', CampgroundSchema);

export default Campground;
