import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Class from '../models/Class.js';
import generateTestToken from '../utils/generateToken.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Class API', function() {
  this.timeout(10000); // Increased timeout to 10 seconds

  let testUser;
  let testToken;
  let classId;

  before(async () => {
    // Clean up database before running tests
    await Class.deleteMany({});

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

  it('should create a new class', (done) => {
    const classData = { name: 'Yoga Class', description: 'A relaxing yoga class', instructor: 'Jane Doe', date: '2023-10-10' };
    chai.request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${testToken}`)
      .send(classData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Yoga Class');
        classId = res.body._id; // Save the ID for later tests
        done();
      });
  });

  it('should get all classes', (done) => {
    chai.request(app)
      .get('/api/classes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should get a class by id', (done) => {
    chai.request(app)
      .get(`/api/classes/${classId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Yoga Class');
        done();
      });
  });

  it('should update a class by id', (done) => {
    chai.request(app)
      .put(`/api/classes/${classId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({ name: 'Advanced Yoga Class' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Advanced Yoga Class');
        done();
      });
  });

  it('should delete a class by id', (done) => {
    chai.request(app)
      .delete(`/api/classes/${classId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Class deleted');
        done();
      });
  });
});
