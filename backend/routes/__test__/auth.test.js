const request = require('supertest');
const app = require('../../app');

// sign up
it('returns 201 for valid signup and valid token is provided', async () => {
  const response = await request(app).post('/api/signup').send({
    email: 'test@test.com',
    password: '1234567'
  }).expect(201);

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


