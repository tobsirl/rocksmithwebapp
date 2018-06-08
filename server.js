import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import users from './routes/api/users';
import profile from './routes/api/profile';
import songrecords from './routes/api/songrecords';
import posts from './routes/api/posts';
import mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

dotenv.config();

const port = process.env.PORT;

export const app = express(); // replaces the previous const app = express();

// Connect to database
// mongoose
//   .connect(process.env.mongoDB)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log(err));
if (process.env.nodeEnv == 'test') {
  // use mockgoose for testing
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(process.env.mongoDB);
  });
} else {
  // use real deal for everything else
  mongoose.connect(process.env.mongoDB);
}

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialise passport
app.use(passport.initialize());

require('./config/passport').default(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/songrecords', songrecords);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));
