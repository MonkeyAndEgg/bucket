const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
let mongo = new MongoMemoryServer();

beforeAll(async () => {
  process.env.JWT_KEY = process.env.JWT_KEY;

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
