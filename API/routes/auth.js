const express = require('express');
const User = require('../models/users');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ user });
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword, roleId });
    
    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

module.exports = router;
