import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Tracker from '../models/Tracker.js';
import generateTestToken from '../utils/generateToken.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Tracker API', function() {
  this.timeout(10000); // Increased timeout to 10 seconds

  let testUser;
  let testToken;
  let trackerId;

  before(async () => {
    // Clean up database before running tests
    await Tracker.deleteMany({});

    // Create a test user and generate a JWT token for authentication
    testUser = {
      _id: '610b0c5993ad1b001f16c85b', // Replace with actual test user ID
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };
    testToken = generateTestToken(testUser._id);
    console.log('Generated Test Token:', testToken);
  });

  it('should create a new tracker entry', (done) => {
    const trackerData = { user: testUser._id, type: 'Calories', value: 2000, date: '2023-08-01' };
    chai.request(app)
      .post('/api/trackers')
      .set('Authorization', `Bearer ${testToken}`)
      .send(trackerData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('type').eql('Calories');
        trackerId = res.body._id; // Save the ID for later tests
        done();
      });
  });

  it('should get all tracker entries', (done) => {
    chai.request(app)
      .get('/api/trackers')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should get a tracker entry by id', (done) => {
    chai.request(app)
      .get(`/api/trackers/${trackerId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('type').eql('Calories');
        done();
      });
  });

  it('should update a tracker entry by id', (done) => {
    chai.request(app)
      .put(`/api/trackers/${trackerId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({ value: 2500 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('value').eql(2500);
        done();
      });
  });

  it('should delete a tracker entry by id', (done) => {
    chai.request(app)
      .delete(`/api/trackers/${trackerId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Tracker entry deleted');
        done();
      });
  });
});
