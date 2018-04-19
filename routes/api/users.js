import express from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router(); // eslint-disable-line

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users Endpoint'}));

// @route   GET api/users/register
// @desc    Tests users route
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}).then((user) => {
    if (user) {
      return res.status(400).json({email: 'Email already exists'});
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User by email
  User.findOne({email: email}).then((user) => {
    // Check for user
    if (!user) {
      return res.status(404).json({email: 'User not found'});
    }

    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res.json({msg: 'Success'});
      } else {
        return res.status(400).json({password: 'Password incorrect'});
      }
    });
  });
});

export default router;
