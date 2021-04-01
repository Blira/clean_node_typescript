import request from 'supertest';
import app from '../config/app';

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'lira',
        email: 'lira@lira.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
