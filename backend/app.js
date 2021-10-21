const express = require('express');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'http://localhost:4200'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    'Access-Control-Allow-Credentials',
    true
  );
  next();
});

app.use(authRouter);
app.use(productsRouter);

module.exports = app;
