const app = require('./app');
const mongoose = require('mongoose');
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.sfz0v.mongodb.net/BucketDatabase?retryWrites=true&w=majority');
    console.log('Connected to database.');
  } catch (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });
}

start();