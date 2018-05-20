# Assignment 2 - ReactJS app + Node.js backend

Name: Paul Tobin 20074222

## Overview.

...... A statement of the app concept and objectives (about a half-page) ........

. . . . . List of user features (excluding user registration and authentication) . . . .

* Feature 1
* Feature 2
* Feature 3
* etc
* etc

## Installation requirements.

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
| /dashboard       | Public         | Dashboard      | Edit/Delete Account - Add playerstats |
| /create-profile  | Private        | CreateProfile  | Create a Profile                      |
| /edit-profile    | Private        | EditProfile    | Edit a Profile                        |
| /playerstats     | Private        | AddPlayerStats | Add Player Stats                      |

# Web API Endpoint Reference

. . . Give a brief overview of the Web API functionality.

## Web API Install and Operation

. . . . Describe how to install/start/stop the API. It would be a good idea to go though the scripts section of the package.json file.

## API Design

Describe your web API.

| HTTP Verb    | Path  | Public/Private        | Description         |
| ----------------------- | --------| -- | ------------------------- |
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
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
```

## Security and Authentication

. . . . Give details of any autentication/security implemented in on the API. Indicate which routes are protected.

## Testing

. . . . Briefly explain any testing strategy that accompanies the project, including and example report if you have one...
![][image4]

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .

## Independent learning.

. . . . . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . . . . .

[image1]: ./model.png
[image2]: ./design.jpg
[image3]: ./screen.png
[image4]: ./testing.png
