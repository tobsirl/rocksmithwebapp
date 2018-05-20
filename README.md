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

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][image1]

Use meaningful sample data. Briefly explain any non-trivial issues.

## App Component Design.

A diagram showing the app's hierarchical component design (see example below).

![][image2]

## UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (user regeneration and login views, if implemented, can be omitted) . . . . . . .

![][image3]

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

. . . Give a brief overview of the Web API functionality.

## Web API Install and Operation

. . . . Describe how to install/start/stop the API. It would be a good idea to go though the scripts section of the package.json file.

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

Describe the configuration approach for your endpoint. For example, contents of config file and where it should be located:

```bash
NODE_ENV=development
PORT=5000
HOST=localhost
mongoDB=YourMongoURL
secret=YourJWTSecret
```

## Security and Authentication

The website has public routes for registering and logging into your new account. Vistors to the site can view the user profiles. You need to be logging into your account to add/edit your profile. The dashboard also allows you to add your player stats.

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

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .

## Independent learning

Redux


[image1]: ./model.png
[image2]: ./design.jpg
[image3]: ./screen.png
[image4]: ./testing.png
