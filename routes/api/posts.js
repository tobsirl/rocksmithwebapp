import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import Post from '../../models/Post';
import Profile from '../../models/Profile';

// Load Validation
import validatePostInput from '../../validation/post';

const router = express.Router(); // eslint-disable-line

// @route Get api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'Post Works'}));

// @route Get api/api/posts
// @desc  Get post
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({nopostsfound: 'No posts found'}));
});

// @route Get api/api/posts/:id
// @desc  Get a single post
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({nopostfound: 'No post found with that ID'})
    );
});

// @route Post api/posts
// @desc  Create Post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

// @route DELETE api/posts
// @desc  Delete Post
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne({user: req.user.id}).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({notauthorized: 'User not authorized'});
          }
          post.remove().then(() => res.json({success: true}));
        })
        .catch((err) => res.status(404).json({postnotfound: 'No post found'}));
    });
  }
);

// @route POST api/posts/like/:id
// @desc  Like Post
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne({user: req.user.id}).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({alreadyliked: 'User already liked this post'});
          }
          // Add user id to the likes array
          post.likes.unshift({user: req.user.id});
          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({postnotfound: 'No post found'}));
    });
  }
);

// @route POST api/posts/unlike/:id
// @desc  UnLike Post
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne({user: req.user.id}).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({notliked: 'You have not yet liked this post'});
          }
          // Get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of the array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({postnotfound: 'No post found'}));
    });
  }
);

// @route POST api/posts/comment/:id
// @desc  Add a comment to post
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id,
        };
        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({postnotfount: 'No post found'}));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Delete a comment to post
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({commentnotexists: 'Comment does not exist'});
        }

        // Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({postnotfound: 'No post found'}));
  }
);

export default router;
