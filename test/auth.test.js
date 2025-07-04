import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';

const testUser = {
  email: 'testuser@example.com',
  password: 'testpass123'
};

describe('Auth Routes - /api/auth/register and /api/auth/login', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Registered successfully');
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser); // same user again

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login an existing user and return a JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');

    // verify the token is valid (optional but good)
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty('email', testUser.email);
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrong pass' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
