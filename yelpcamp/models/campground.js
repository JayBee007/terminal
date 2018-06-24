import mongoose from 'mongoose';

const CampgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

CampgroundSchema.statics.findByUserId = function findByUserId(campgroundId, userId) {
  const Campground = this;

  return new Promise((resolve, reject) => {
    Campground.findById(campgroundId)
      .then(campground => {
        if(!campground) return reject(new Error('No campground found'));

        if(campground.author.id.equals(userId)) {
          return resolve(campground);
        }

        return reject( new Error('Unauthorized access'));
      })
  })

  // return Campground.findById(campgroundId)
  //   .then(campground => {
  //     if(!campground) {
  //       return Promise.reject(new Error('No campground found'));
  //     }

  //     return new Promise((resolve, reject) => {
  //       if(campground.author.id.equals(userId)) {
  //         resolve(campground);
  //       }else {
  //         reject( new Error('Unauthorized access'));
  //       }
  //     })
  //   }).catch(err => Promise.reject(err));

};


const Campground = mongoose.model('Campground', CampgroundSchema);

// Campground.create({
//   name: 'Granite Hill',
//   image: 'https://loremflickr.com/800/600',
//   description: 'Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
// })

// Campground.create({
//   name: 'Snow Mountain',
//   image: 'https://loremflickr.com/800/600',
//   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
// })

export default Campground;
