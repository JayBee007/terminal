import express from 'express';

const router = express.Router();

router.get('/list', (req,res) => {
  res.json('pokemon list');
});

export default router;
