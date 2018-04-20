import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import users from './routes/api/users';
import profiles from './routes/api/profile';
import songrecords from './routes/api/songrecords';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT;

const app = express();

// Connect to database
mongoose
  .connect(process.env.mongoDB)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialise passport
app.use(passport.initialize());

require('./config/passport').default(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/songrecords', songrecords);

app.listen(port, () => console.log(`Server running on port ${port}`));
