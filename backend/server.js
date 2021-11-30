require('dotenv').config()

const app = require('./app');
const mongoose = require('mongoose');
// import dotenv to access secrets

const PORT = process.env.PORT | 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database.');
  } catch (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });
}

start();
