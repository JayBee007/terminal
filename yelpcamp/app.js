/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import expressSession from 'express-session';

import './db';

// routes
import campgroundsRoutes from './routes/campgrounds-routes';
import authRoutes from './routes/auth-routes';
import commentsRoutes from './routes/comments-routes';

// models
import User from './models/user';

// middleware
import { addUserToReq } from './middleware';

// import seedDB from './seed';

// seedDB();

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'onceuponatimeinfifa',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(addUserToReq);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.render('landing', {user:req.user});
});

app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);
app.use('/auth', authRoutes);

app.listen(4000, () => {
  console.log('app running');
});
