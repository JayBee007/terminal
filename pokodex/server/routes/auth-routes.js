import express from 'express';

const router = express.Router();

router.get("/facebook", (req,res) => {
  res.json(req.path);
})

router.get("/logout", (req,res) => {
  res.send("loggin out");
})

export default router;
