import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  image:{
    type: String
  },
  abilities: [{ type: String}],
  types: [{type:String}]
});

FavoriteSchema.statics.findOrCreate = function(id, name, avatar, abilities, types) {
  const Favorite = this;
  return this.findOne({id}, function(err, favorite) {
    if(!favorite) {
      const newFav = new Favorite({
        id,
        name,
        image:avatar,
        abilities,
        types
      });

      newFav.save(function(error, savedFav) {
        if(error) {
          return console.error(error);
        }
        return savedFav;
      });
    }else {
      return favorite;
    }
  });
}


const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;
