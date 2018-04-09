import './config/config';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';

import mongoose from './db/mongoose';
import User from './models/user';

// routes
import authRoutes from './routes/auth-routes';
import apiRoutes from './routes/api-routes';
import facebook from './passport/facebook';

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use(passport.initialize());

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'build/')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use('/auth', authRoutes);
app.use('/pokemons', apiRoutes);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
