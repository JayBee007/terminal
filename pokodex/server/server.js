import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import https from 'https';
import cookieSession from 'cookie-session';
import passport from 'passport';

import mongoose from './db/mongoose';
import User from './models/user';

import { COOKIE_KEY } from './config/keys';

// routes
import authRoutes from './routes/auth-routes';
import facebook from './passport/facebook';

const certOptions = {
  key: fs.readFileSync(path.resolve('certs/server.key')),
  cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../client/')));


// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

app.use('/auth', authRoutes);

app.get('/', (req,res) => {
  res.send("Hello Heroku");
})

https.createServer(certOptions, app).listen(3000);

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });
