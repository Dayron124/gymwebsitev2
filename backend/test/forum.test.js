import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Forum from '../models/Forum.js';
import User from '../models/User.js';
import generateTestToken from '../utils/generateToken.js';  // Import the token generator

const { expect } = chai;
chai.use(chaiHttp);

describe('Forum API', () => {
  let testUser;
  let testToken;

  before(async () => {
    await Forum.deleteMany({});
    await User.deleteMany({});

    // Create a test user
    testUser = new User({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });
    await testUser.save();

    // Generate the token using the utility
    testToken = generateTestToken(testUser._id);

    // Log the token to verify it's being generated correctly
    console.log('Generated Test Token:', testToken);

    // Ensure the token is valid
    expect(testToken).to.be.a('string');
    expect(testToken.split('.').length).to.equal(3); // JWT should have three parts
  });

  it('should create a new forum', (done) => {
    chai.request(app)
      .post('/api/forums')
      .set('Authorization', `Bearer ${testToken}`)  // Use the generated test token for authorization
      .send({ title: 'New Forum', description: 'This is a new forum.', user: testUser._id })  // Pass the user's _id
      .end((err, res) => {
        if (err) {
          console.error(`Error in create forum test: ${err.message}`);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title').eql('New Forum');
        done();
      });
  });

  // ... Other tests (get, update, delete) follow the same structure
});
