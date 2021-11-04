const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

// add product
it('returns 201 for successfully create a product', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  await request(app).post('/api/products').send({
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
});

// update product
it('returns 200 for successfully update a product', async () => {
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

  await request(app).put(`/api/products/${response.body._id}`).send({
    name: 'test',
    price: 15,
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
  }).expect(200);
});

it('returns 404 for not exist id param', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  await request(app).put(`/api/products/${id}`).send({
    name: 'test',
    price: 15,
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
  }).expect(404);
});


// delete product
it('returns 200 for successfully delete a product', async () => {
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

  await request(app).delete(`/api/products/${response.body._id}`).send({}).expect(200);
});

it('returns 404 for not exist id param', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  await request(app).put(`/api/products/${id}`).send({}).expect(404);
});


// get product
it('returns 200 for get products', async () => {
  await request(app).get(`/api/products`).send({}).expect(200);
});

it('returns 200 for get a exist product', async () => {
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

  await request(app).get(`/api/products/${response.body._id}`).send({}).expect(200);
});

it('returns 404 for get a non-exist product', async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/products/${id}`).send({}).expect(404);
});
