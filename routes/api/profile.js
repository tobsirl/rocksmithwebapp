import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import Profile from '../../models/Profile';
import User from '../../models/User';

// Load Validation
import validateProfileInput from '../../validation/profile';
import validatePlayerStatsInput from '../../validation/playerStats';

const router = express.Router(); // eslint-disable-line

// @route   GET api/profile/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profiles Endpoint'}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const errors = {};
      const profile = await Profile.findOne({user: req.user.id}).populate(
        'user',
        ['name', 'avatar']
      );
      if (profile) {
        return res.json(profile);
      } else {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
    } catch (err) {
      return res.status(404).json(err);
    }
  }
);

// @route   Get api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const errors = {};
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    if (profiles) {
      return res.json(profiles);
    } else {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }
  } catch (err) {
    return res.status(404).json(err);
  }
});

// @route   Get api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar']);
    if (profile) {
      return res.json(profile);
    } else {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
  } catch (err) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }
});

// @route   Get api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:userId', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);
    if (profile) {
      return res.json(profile);
    } else {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
  } catch (err) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }
});

// @route   Post api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const {errors, isValid} = validateProfileInput(req.body);

      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      // Get data
      const profileData = {};
      profileData.user = req.user.id;

      if (req.body.handle) profileData.handle = req.body.handle;
      if (req.body.instrementType) {
        profileData.instrementType = req.body.instrementType;
      }
      if (req.body.instrementModel) {
        profileData.instrementModel = req.body.instrementModel;
      }
      if (req.body.experience) profileData.experience = req.body.experience;
      // favouriteMusic split into array
      if (typeof req.body.favouriteMusic !== 'undefined') {
        profileData.favouriteMusic = req.body.favouriteMusic.split(',');
      }

      // favouriteArtists split into array
      if (typeof req.body.favouriteArtists !== 'undefined') {
        profileData.favouriteArtists = req.body.favouriteArtists.split(',');
      }

      if (req.body.bio) profileData.bio = req.body.bio;

      let profile = await Profile.findOne({user: req.user.id});
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileData},
          {new: true}
        );
        return res.json(profile);
      } else {
        // Create
        // Check if handle exists
        profile = await Profile.findOne({handle: profileData.handle});
        if (profile) {
          errors.handle = 'That handle already exists';
          return res.status(400).json(errors);
        }
        // Save Profile
        profile = await new Profile(profileData).save();
        return res.json(profile);
      }
    } catch (err) {
      throw err;
    }
  }
);

// @route   Post api/profile/playerstats
// @desc    Add playerstats to profile
// @access  Private
router.post(
  '/playerstats',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const {errors, isValid} = validatePlayerStatsInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      let profile = await Profile.findOne({user: req.user.id});
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      const newPlayerStats = {
        totalTimePlayed: req.body.totalTimePlayed,
        songsPlayed: req.body.songsPlayed,
        missionsCompleted: req.body.missionsCompleted,
        lessonsCompleted: req.body.lessonsCompleted,
        highestArcadeScore: req.body.highestArcadeScore,
      };
      profile.playerStats.unshift(newPlayerStats);
      profile = await profile.save();
      return res.json(profile);
    } catch (err) {
      throw err;
    }
  }
);

// @route   Delete api/profile/playerstats/:ps_id
// @desc    Delete playerstats from profile
// @access  Private
router.delete(
  '/playerstats/:ps_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne({user: req.user.id})
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.playerStats
          .map((item) => item.id)
          .indexOf(req.params.ps_id);

        // Splice out of array
        profile.playerStats.splice(removeIndex, 1);
        // Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(err));
  }
);

// @route   Delete api/profile/
// @desc    Delete User and Profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      await Profile.findByIdAndRemove({user: req.user.id});
      await User.findByIdAndRemove({_id: req.user.id});
      return res.json({success: true});
    } catch (err) {
      throw err;
    }
  }
);

export default router;
