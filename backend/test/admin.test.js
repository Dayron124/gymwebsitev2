import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/User.js';
import generateTestToken from '../utils/generateToken.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Admin API', function() {
  this.timeout(10000); // Increased timeout to 10 seconds

  let adminUser, regularUser, adminToken, userId;

  before(async () => {
    // Clean up database before running tests
    await User.deleteMany({});

    // Create a test admin user
    adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpassword',
      isAdmin: true,
    });
    await adminUser.save();
    adminToken = generateTestToken(adminUser._id);
    console.log('Generated Admin Token:', adminToken);

    // Create a regular user
    regularUser = new User({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'userpassword',
      isAdmin: false,
    });
    await regularUser.save();
    userId = regularUser._id;
  });

  it('should get all users (admin only)', (done) => {
    chai.request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should update a user (admin only)', (done) => {
    chai.request(app)
      .put(`/api/admin/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isAdmin: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('isAdmin').eql(true);
        done();
      });
  });

  it('should delete a user (admin only)', (done) => {
    chai.request(app)
      .delete(`/api/admin/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('User deleted');
        done();
      });
  });
});
