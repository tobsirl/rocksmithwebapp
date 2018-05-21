# Assignment 2 - ReactJS app + Node.js backend

Name: Paul Tobin

## Overview.

Based on [Rocksmith 2014 remastered](https://rocksmith.ubisoft.com/rocksmith/en-us/home/) . Rocksmith is a music video game/learning tool developed by Ubisoft, it’s available on all major platforms, Xbox, PlayStation and PC. The game comes bundled with the Real Tone Cable, which is a USB lead that can be plugged into an electric guitar or bass. The Real Tone Cable allows the game to listen to the notes being played on the instrument and determined if the correct note was played at the correct time. It’s also capable of detecting other guitar techniques such as bends, slides, hammer ons and pull offs. Rocksmith offers a wide variety of guitar-based music and continues to grow its library with weekly downloadable content.

[Youtude Video](https://www.youtube.com/watch?v=XHM9uB2kNkU)


* Profile for players of the game
* Update with player stats
* Store information on platform, instrement and bio

## Installation requirements
Installing dependencies:
```bash
npm install
```
To run the dev server
```bash
npm run dev
```
The project uses concurrently so both backend and frontend with start together
```json
"dev": "concurrently \"npm run server\" \"npm run client\""
```

### Server Side

* dotenv
* bcryptjs
* body-parser
* concurrently
* express
* jsonwebtoken
* passport
* passport-jwt
* validator
* babel-cli
* babel-preset-env
* eslint
* eslint-config-google
* nodemon

### Client Side

* ReactJS
* Redux
* Bootstrap 4
* create-react-app tool
* axios
* classnames
* react-redux
* react-router-dom
* redux-thunk
* jwt-decode

## Data Model Design

#### User Model

```json
// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
```

#### Profile Model

```json
// Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  platform: {
    type: String,
  },
  instrementType: {
    type: String,
  },
  instrementModel: {
    type: String,
  },
  experience: {
    type: String,
  },
  favouriteMusic: {
    type: [String],
  },
  favouriteArtists: {
    type: [String],
  },
  bio: {
    type: String,
  },
  playerStats: [
    {
      totalTimePlayed: {
        type: Number,
      },
      songsPlayed: {
        type: Number,
      },
      missionsCompleted: {
        type: Number,
      },
      lessonsCompleted: {
        type: Number,
      },
      highestArcadeScore: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
```


## App Component Design.

A diagram showing the app's hierarchical component design (see example below).



## UI Design.

![home](https://user-images.githubusercontent.com/25591390/40295931-095d4012-5cd3-11e8-9dd0-0ee76789286d.PNG)
![login](https://user-images.githubusercontent.com/25591390/40295956-213efdba-5cd3-11e8-93f1-935205405028.PNG)
![register](https://user-images.githubusercontent.com/25591390/40295970-2f85f112-5cd3-11e8-8c27-5ae1837c9f80.PNG)



## Routing

| Route            | Public/Private | Component      | Description                           |
| ---------------- | -------------- | -------------- | ------------------------------------- |
| /                | Public         | Home           |
| /register        | Public         | Register       | Create a User Account                 |
| /login           | Public         | Login          | Login with User Account               |
| /profiles        | Public         | Profiles       | View all Users                        |
| /profile/:handle | Public         | Profile        | View a Profile by handle              |
| /dashboard       | Private        | Dashboard      | Edit/Delete Account - Add playerstats |
| /create-profile  | Private        | CreateProfile  | Create a Profile                      |
| /edit-profile    | Private        | EditProfile    | Edit a Profile                        |
| /playerstats     | Private        | AddPlayerStats | Add Player Stats                      |

# Web API Endpoint Reference

API can register a user, login and get the current user. Once the user has created a profile they have access to the dashboard. From here they can edit their profile or add player stats.



## API Design

The backend Web API is a standard register as a user, login into to your account and begin using the website. Once you are a registered user you can create a profile through the dashboard.

| HTTP Verb               | Path     | Public/Private | Description |
| -- | -- |   --   |  --   |     
| POST:| /api/users/register |Public  | Register a New User |
| POST:| /api/users/login | Public           | Login User    |
| GET: | /api/users/current   | Private | Return Current User    |
| GET: |/api/profile/ | Private        | Get Current Users Profile
| GET:      | /api/profile/all     |    Public    |Get all profiles
| GET: | /api/profile/handle/:handle | Public | Get Profile by Handle
| GET: |/api/profile/user/:user_id | Public | Get Profile by User ID
| POST:| /api/profile/| Private   | Create or edit user profile
| POST: |/api/profile/playerstats | Private| Add playerstats to profile
|DELETE:|/api/profile/playerstats/:ps_id |Private |Delete playerstats from profile
|DELETE:|/api/profile/|Private| Delete User and Profile

## API Configuration

The API is using Mongoose with cloud based MongoDB, [Mlab](https://mlab.com/welcome/)

```bash
NODE_ENV=development
PORT=5000
HOST=localhost
mongoDB=YourMongoURL
secret=YourJWTSecret
```

## Security and Authentication

The website has public routes for registering and logging into your new account. Vistors to the site can view the user profiles. You need to be logging into your account to add/edit your profile. The dashboard also allows you to add your player stats.

+ [jwt-token](https://jwt.io/)  
+ [passport](http://www.passportjs.org/)


## Testing
Testing is partial implemention on the backend API using mocha, should, supertest, mockgoose and mochawesome for report. The front end isn't tested.

Tests can be run with the following command:
```bash
npm run test
```
```json
"test": "cross-env NODE_ENV=test mocha --require babel-core/register --require babel-polyfill --reporter mochawesome --exit"
```


## Extra features


## Independent learning

Redux


