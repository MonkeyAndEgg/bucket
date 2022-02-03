const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

// sign up
it('returns 201 for valid signup with valid token and empty cart', async () => {
  const response = await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const tokenResponse = await request(app).get(`/api/token/${response.body.userId}`).expect(200);
  const cartResponse = await request(app).get(`/api/cart/${response.body.userId}`).expect(200);
  expect(cartResponse.body.userId).toEqual(response.body.userId);
  expect(tokenResponse.body.token).toBeDefined();
  expect(response.body.token).toBeDefined();
});

it('returns 400 for exist email', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(400);
});

it('returns 400 for empty request body', async () => {
  await request(app).post('/api/signup').send({
    email: ''
  }).expect(400);
});

// sign in
it('returns 200 for valid signin and valid token is provided', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  const response = await request(app).post('/api/signin').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(200);

  const tokenResponse = await request(app).get(`/api/token/${response.body.userId}`).expect(200);
  expect(tokenResponse.body.token).toBeDefined();
  expect(response.body.token).toBeDefined();
});

it('returns 400 when email does not exist for signin', async () => {
  await request(app).post('/api/signin').send({
    email: 'testNotExist@test.com',
    password: '1234567'
  }).expect(400);
});

it('returns 400 when password does not match for signin', async () => {
  await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  await request(app).post('/api/signin').send({
    email: 'test@test.com',
    password: '12345'
  }).expect(400);
});

it('returns 400 for empty request body', async () => {
  await request(app).post('/api/signin').send({
    password: ''
  }).expect(400);
});

it('returns 404 for invalid user id when resetting password', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).post(`/api/reset-password/${id}`).send({
    password: '1234567'
  }).expect(404);
});

it('returns 200 when reset a valid user password', async () => {
  const response = await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

  await request(app).post(`/api/reset-password/${response.body.userId}`).send({
    password: '12345'
  }).expect(200);

  const tokenResponse = await request(app).get(`/api/token/${response.body.userId}`).expect(200);
  expect(tokenResponse.body.token).toBeDefined();
});
