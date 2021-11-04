const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

// add order
it('returns 201 for successfully create an order', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const response = await request(app).post('/api/products').send({
    name: 'test',
    price: 12.99,
    description: '123',
    numOfStocks: 3,
    image: {
      name: "ps5.jpg",
      size: 16864,
      type: "image/jpeg",
      webkitRelativePath: "",
      lastModified: 1634790702880,
      lastModifiedDate: new Date('Wed Oct 20 2021 21:31:42 GMT-0700 (Pacific Daylight Time)')
    }
  }).expect(201);

  await request(app).post('/api/orders').send({
    userId: '1234567',
    productDataList: [
      { product: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);
});

it('returns 400 for creating an order for one or more non-exist product', async () => {
  const productId = mongoose.Types.ObjectId().toHexString();

  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);


  await request(app).post('/api/orders').send({
    userId: '1234567',
    productDataList: [
      { product: `${productId}`, quantity: 2 }
    ]
  }).expect(400);
});


// update order
it('returns 200 for successfully update an order', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const response = await request(app).post('/api/products').send({
    name: 'test',
    price: 12.99,
    description: '123',
    numOfStocks: 3,
    image: {
      name: "ps5.jpg",
      size: 16864,
      type: "image/jpeg",
      webkitRelativePath: "",
      lastModified: 1634790702880,
      lastModifiedDate: new Date('Wed Oct 20 2021 21:31:42 GMT-0700 (Pacific Daylight Time)')
    }
  }).expect(201);

  const orderResponse = await request(app).post('/api/orders').send({
    userId: '1234567',
    productDataList: [
      { product: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);

  await request(app).put(`/api/orders/${orderResponse.body._id}`).send({
    userId: '1234567',
    productDataList: [
      { product: `${response.body._id}`, quantity: 3 }
    ]
  }).expect(200);
});


// delete order
it('returns 200 for successfully delete an order', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const response = await request(app).post('/api/products').send({
    name: 'test',
    price: 12.99,
    description: '123',
    numOfStocks: 3,
    image: {
      name: "ps5.jpg",
      size: 16864,
      type: "image/jpeg",
      webkitRelativePath: "",
      lastModified: 1634790702880,
      lastModifiedDate: new Date('Wed Oct 20 2021 21:31:42 GMT-0700 (Pacific Daylight Time)')
    }
  }).expect(201);

  const orderResponse = await request(app).post('/api/orders').send({
    userId: '1234567',
    productDataList: [
      { product: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);

  await request(app).delete(`/api/orders/${orderResponse.body._id}`).send({}).expect(200);
});

it('returns 404 for delete non-exist order', async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/orders/${id}`).send({}).expect(404);
});

// get order
it('returns 200 for successfully get an order', async () => {

  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const response = await request(app).post('/api/products').send({
    name: 'test',
    price: 12.99,
    description: '123',
    numOfStocks: 3,
    image: {
      name: "ps5.jpg",
      size: 16864,
      type: "image/jpeg",
      webkitRelativePath: "",
      lastModified: 1634790702880,
      lastModifiedDate: new Date('Wed Oct 20 2021 21:31:42 GMT-0700 (Pacific Daylight Time)')
    }
  }).expect(201);

  await request(app).post('/api/orders').send({
    userId: '1234567',
    productDataList: [
      { product: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);

  await request(app).get(`/api/orders/1234567`).send({}).expect(200);
});

it('returns 404 for getting non-exist order', async () => {
  await request(app).get(`/api/orders/1234`).send({}).expect(404);
});

it('returns 200 for getting orders', async () => {
  await request(app).get(`/api/orders`).send({}).expect(200);
});
