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

router.post('/favorites', authorize, async (req,res) => {
  const id = +req.body.id;
  const token = req.token;

  await User.findOne({token:req.token}, async (err, user) => {
    if(user.fav.includes(id)) {
      await User.update({token}, {$pull: { fav: id}});
      res.send({message: `${id} removed`}).sendStatus(200);
    }else {
      await User.update({token}, { $addToSet: { fav: id}});
      res.send({message: `${id} added`}).sendStatus(200);
    }
  })

});

router.get('/favorites',authorize, async (req,res) => {
  const token = req.token;
  await User.findOne({token}, async (err,user) => {
    res.send({fav: user.fav}).sendStatus(200);
  });
})

export default router;
