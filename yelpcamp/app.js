/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import './db';

// Routes;
import campgroundsRoutes from './routes/campgrounds-routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.use('/campgrounds', campgroundsRoutes);


app.listen(4000, () => {
  console.log('app running');
});
