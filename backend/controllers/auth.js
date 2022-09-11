const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cart = require('../models/cart');
const Token = require('../models/token');
const nodemailer = require('nodemailer');
const errHandler = require('../util/errorHandler');

exports.createUser = async (req, res) => {
  try {
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

    const token = await generateToken(user);

    // generate a cart for this user since the user is just signed up
    const cart = await new Cart({
      userId: user._id,
      products: []
    });
    await cart.save();

    return res.status(201).send({
      userId: user._id,
      token,
      expiresIn: 60 * 60 // in seconds
    });
  } catch (e) {
    errHandler(e, res);
  }
}

exports.loginUser = async (req, res) => {
  try {
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
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({
        message: 'Invalid credentials'
      });
    }

    const token = await generateToken(user);

    return res.status(200).send({
      userId: user._id,
      token,
      expiresIn: 60 * 60 // in seconds
    });
  } catch(e) {
    errHandler(e, res);
  }
}

exports.logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await Token.deleteOne({ userId });
    if (result.deletedCount > 0) {
      res.status(200).send({
        message: `User with id: ${userId} is signed out.`
      });
    } else {
      res.status(404).send({
        message: `The token with user id: ${userId} does not exist.`
      });
    }
  } catch (err) {
    errHandler(e, res);
  }
}

exports.resetPasswords = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({
        message: 'The email does not exist'
      });
    }

    const token = await generateToken(user);

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
          user: process.env.USER,
          pass: process.env.PASS,
      },
    });
    console.log(`Sending the reset email to ${email}...`);
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: 'Password Reset',
      html: `
        <div style="width:100%;height: 56px;background-color: #ffc107;color: #ffffff;margin-bottom: 30px;">
          <label style="font-size: 40px;font-family: cursive;margin-left: 16px;">Bucket</label>
        </div>
        <div style="display: flex;flex-direction: column;">
          Please reset your password with this link:<br>
          <a style="font-family: cursive;align-self: center;margin-top: 10px;background: #2196f3;border-radius: 3px;height: 23px;width: 140px;text-align: center;color: #ffffff;" href="${process.env.RESET_BASE_URL}/reset-password/${user._id}">
            Reset Password
          </a>
        </div>
      `
    });

    console.log("Reset email sent sucessfully!");
    return res.status(200).send({
      userId: user._id,
      token,
      expiresIn: 60 * 60 // in seconds
    });
  } catch (e) {
    errHandler(e, res);
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({
        message: 'The user does not exist'
      });
    }
    const existingToken = await Token.findOne({ userId: user._id });
    if (existingToken) {
      // check expiration of the token
      const tokenCreationDate = new Date(existingToken.createdAt);
      // adding 1 hour to the create date and it is used as the expiration date
      tokenCreationDate.setHours(tokenCreationDate.getHours() + 1);
      const expireTime= tokenCreationDate.getTime();
      const currentTime = new Date().getTime();
      if (expireTime > currentTime) {
        const hashedPassword = await bcrypt.hash(password, 15);
        user.set({
          password: hashedPassword
        });
        await user.save();
        console.log('Password is reset.');
        // re-generate the token after password reset so the user can be signin status without login again
        existingToken.set({
          createdAt: new Date().toISOString()
        });
        await existingToken.save();
        return res.status(200).send({
          userId: user._id,
          token: existingToken.token,
          expiresIn: 60 * 60 // in seconds
        });
      }
    }
    res.status(400).send({
      message: 'Sorry, the token with the email has expired. Please request another email to reset your password.'
    });
  } catch (err) {
    errHandler(e, res);
  }
}

exports.getUser = async (req, res) => {
  try {
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
  } catch(e) {
    errHandler(e, res);
  }
}

// used for testing
exports.getUserToken = async (req, res) => {
  try {
    const token = await Token.findOne({
      userId: req.params.userId
    });
    if (token) {
      return res.status(200).send(token);
    } else {
      return res.status(404).send({
        message: `The token with user id: ${userId} does not exist`
      });
    }
  } catch (err) {
    errHandler(e, res);
  }
}

async function generateToken(user) {
  const tokenStr = jwt.sign(
    {
      email: user.email,
      id: user._id
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1h'
    }
  );
  const currentTime = new Date();
  const existingToken = await Token.findOne({ userId: user._id });
  if (existingToken) {
    existingToken.set({
      token: tokenStr,
      createdAt: currentTime.toISOString()
    });
    await existingToken.save();
  } else {
    const token = await new Token({
      userId: user._id,
      token: tokenStr,
      createdAt: currentTime.toISOString()
    });
    await token.save();
  }
  return tokenStr;
}
