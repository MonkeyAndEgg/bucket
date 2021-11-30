const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cart = require('../models/cart');

exports.createUser = async (req, res) => {
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
    process.env.JWT_KEY,
    {
      expiresIn: '1h'
    }
  );

  // generate a cart for this user since the user is just signed up
  const cart = await new Cart({
    userId: user._id,
    products: []
  });
  cart.save();

  return res.status(201).send({
    userId: user._id,
    token,
    expiresIn: 60 * 60 // in seconds
  });
}

exports.loginUser = async (req, res) => {
  if (!req.body || (!req.body.email && !req.body.password)) {
    return res.status(400).send({
      message: 'Empty request body'
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).send({
      message: 'The email does not exist'
    });
  }
  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id
      },
      process.env.JWT_KEY,
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
}

exports.getUser = async (req, res) => {
  let currentUser = undefined;
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      const { id, email } = payload;
      const user = await User.findById(id);
      currentUser = {
        id, email, isAdmin: user.isAdmin
      };
    } catch (err) {
      res.status(500).send({
        message: err.message
      })
    }
  }
  res.status(200).send({
    currentUser
  });
}
