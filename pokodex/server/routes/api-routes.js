import express from 'express';
import axios from 'axios';
const router = express.Router();

import authorize from '../middleware/authorize';
import User from '../models/user';

router.get('/list', authorize, async (req,res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const data = []
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

    await Promise.all(response.data.results.map(async (pokemon) => {
        const pkmon = await axios.get(pokemon.url);

        const name = pkmon.data.name;

        const id = pkmon.data.id;

        const abilities = pkmon.data.abilities.map(ability => {
          return ability.ability.name;
        });

        const types = pkmon.data.types.map(typ => {
          return typ.type.name;
        });

        const image = pkmon.data.sprites.front_default;

        data.push({name, id, abilities, types, image});
    }));

    res.send(data);
  } catch (error) {
    res.status(500).send({'message':error});
  }
});

router.post('/favorites', authorize, (req,res) => {
    User.update({token: req.token},{$push: {fav: req.body.id}}).then(() => {
      return;
    });

    res.status(200).status({message: `${req.body.id} pushed to fav arrays` });
})


// PersonModel.update(
//   { _id: person._id },
//   { $push: { friends: friend } },
//   done
// );

// app.post('/todos', authenticate, async (req,res) => {
//   const todo = new Todo({
//       text: req.body.text,
//       _creator: req.user._id
//   });

//   try {
//         const doc = await todo.save();
//         res.send(doc);
//   } catch (e) {
//      res.status(400).send(e);
//   }

// });

router.get('/favorites',authorize, (req,res) => {
  res.send('FAVORITES');
})

export default router;
