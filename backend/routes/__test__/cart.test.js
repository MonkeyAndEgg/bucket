const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

// add new cart
it('returns 201 for successfully create a cart', async () => {
  await request(app).post('/api/signup').send({
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

  await request(app).post('/api/cart').send({
    userId: '1234567',
    productDataList: [
      { productId: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);
});

it('returns 400 for creating a cart for one or more non-exist product', async () => {
  const productId = mongoose.Types.ObjectId().toHexString();

  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);


  await request(app).post('/api/cart').send({
    userId: '1234567',
    productDataList: [
      { product: `${productId}`, quantity: 2 }
    ]
  }).expect(400);
});


// update cart
it('returns 200 for successfully update an cart', async () => {
  await request(app).post('/api/signup').send({
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

  const orderResponse = await request(app).post('/api/cart').send({
    userId: '1234567',
    productDataList: [
      { productId: `${response.body._id}`, quantity: 2}
    ]
  }).expect(201);

  await request(app).put(`/api/cart/${orderResponse.body._id}`).send({
    userId: '1234567',
    productDataList: [
      { productId: `${response.body._id}`, quantity: 3, status: 'Wait To Deliver' }
    ]
  }).expect(200);
});


// delete cart
it('returns 200 for successfully delete a cart', async () => {
  await request(app).post('/api/signup').send({
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

  const orderResponse = await request(app).post('/api/cart').send({
    userId: '1234567',
    productDataList: [
      { productId: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);

  await request(app).delete(`/api/cart/${orderResponse.body._id}`).send({}).expect(200);
});

it('returns 404 for delete non-exist cart', async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/cart/${id}`).send({}).expect(404);
});

// get cart
it('returns 200 for successfully get a cart', async () => {

  await request(app).post('/api/signup').send({
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

  await request(app).post('/api/cart').send({
    userId: '1234567',
    productDataList: [
      { productId: `${response.body._id}`, quantity: 2 }
    ]
  }).expect(201);

  await request(app).get(`/api/cart/1234567`).send({}).expect(200);
});

it('returns 404 for getting non-exist cart', async () => {
  await request(app).get(`/api/cart/1234`).send({}).expect(404);
});

it('returns 200 for getting cart', async () => {
  await request(app).get(`/api/cart`).send({}).expect(200);
});
