import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Competition from '../models/Competition.js';
import generateTestToken from '../utils/generateToken.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Competition API', function() {
  this.timeout(10000); // Increased timeout to 10 seconds

  let testUser;
  let testToken;
  let competitionId;

  before(async () => {
    // Clean up database before running tests
    await Competition.deleteMany({});

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

  it('should create a new competition', (done) => {
    const competitionData = { name: 'Summer Championship', description: 'Annual summer competition', date: '2023-08-15', location: 'New York' };
    chai.request(app)
      .post('/api/competitions')
      .set('Authorization', `Bearer ${testToken}`)
      .send(competitionData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Summer Championship');
        competitionId = res.body._id; // Save the ID for later tests
        done();
      });
  });

  it('should get all competitions', (done) => {
    chai.request(app)
      .get('/api/competitions')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should get a competition by id', (done) => {
    chai.request(app)
      .get(`/api/competitions/${competitionId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Summer Championship');
        done();
      });
  });

  it('should update a competition by id', (done) => {
    chai.request(app)
      .put(`/api/competitions/${competitionId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({ name: 'Updated Summer Championship' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Updated Summer Championship');
        done();
      });
  });

  it('should delete a competition by id', (done) => {
    chai.request(app)
      .delete(`/api/competitions/${competitionId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Competition deleted');
        done();
      });
  });
});
