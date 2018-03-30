import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import mongoose from './db/mongoose';
import User from './models/user';

// routes
import authRoutes from './routes/auth-routes';

const PORT = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'html');

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../client/')));


// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

app.use('/auth', authRoutes);

app.get('/', (req,res) => {
  res.send("Hello Heroku");
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
