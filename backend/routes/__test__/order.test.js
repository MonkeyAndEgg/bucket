const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

it('returns 404 for getting a non-exist order', async () => {
  const orderId = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/order/${orderId}`).send({}).expect(404);
});

it('returns 404 for getting orders from a non-exist user', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/orders/${userId}`).send({}).expect(404);
});

it('returns 400 when create order with empty products', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  await request(app).post('/api/order').send({
    userId,
    productDataList: []
  }).expect(400);
});

it('returns 201 for creating orders and 200 for getting the orders', async () => {
  const userResponse = await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const response = await request(app).post('/api/products').send({
    name: 'test',
    price: 12.99,
    description: '123',
    numOfStocks: 3,
    type: 'Bags',
    image: {
      name: "ps5.jpg",
      size: 16864,
      type: "image/jpeg",
      webkitRelativePath: "",
      lastModified: 1634790702880,
      lastModifiedDate: new Date('Wed Oct 20 2021 21:31:42 GMT-0700 (Pacific Daylight Time)')
    }
  }).expect(201);

  await request(app).post('/api/order').send({
    userId: userResponse.body.userId,
    productDataList: [
      { productId: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);

  await request(app).get(`/api/orders/${userResponse.body.userId}`).send({}).expect(200);
});

