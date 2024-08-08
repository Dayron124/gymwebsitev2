import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/User.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('User API', () => {
  // Clear the database before running tests
  before(async () => {
    try {
      await User.deleteMany({});
    } catch (error) {
      console.error(`Error clearing users: ${error.message}`);
    }
  });

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('email').eql('test@example.com');
        done();
      });
  });

  it('should not register a user with existing email', (done) => {
    chai.request(app)
      .post('/api/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('User already exists');
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not login a user with invalid credentials', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Invalid credentials');
        done();
      });
  });
});
