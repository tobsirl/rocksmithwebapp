import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playerStatsSchema = new Schema(
  {
    totalTimePlayed: {
      type: String,
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
  {_id: false}
);

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
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  playerStats: [playerStatsSchema],
});

export default mongoose.model('profile', ProfileSchema);
