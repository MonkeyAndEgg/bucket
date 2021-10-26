const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/api/signup', async (req, res) => {
  if (!req.body || (!req.body.email && !req.body.password)) {
    return res.status(400).send({
      message: 'Empty request body'
    });
  }
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      message: 'Email in use'
    });
  }
  const hashedPassword = await bcrypt.hash(password, 15);
  const user = new User({
    email,
    password: hashedPassword
  });
  await user.save();
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id
    },
    'my_epic_secret_key',
    {
      expiresIn: '1h'
    }
  );
  return res.status(201).send({
    userId: user._id,
    token,
    expiresIn: 60 * 60 // in seconds
  });
});

router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).send({
      message: 'Invalid credentials'
    });
  }
  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id
      },
      'my_epic_secret_key',
      {
        expiresIn: '1h'
      }
    );
    return res.status(200).send({
      userId: user._id,
      token,
      expiresIn: 60 * 60 // in seconds
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
});

router.get("/api/user", async (req, res) => {
  let currentUser = undefined;
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined;
  if (token) {
    try {
      const payload = jwt.verify(token, 'my_epic_secret_key');
      const { id, email } = payload;
      currentUser = {
        id, email
      };
    } catch (err) {
      res.status(500).send({
        message: err.message
      })
    }
  }
  res.status(201).send({
    currentUser
  });
});

module.exports = router;
