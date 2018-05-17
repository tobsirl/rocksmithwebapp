import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
    enum: ['PC', 'XBOX', 'PS4'],
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

export default mongoose.model('profile', ProfileSchema);
