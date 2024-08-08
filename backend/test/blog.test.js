import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Blog from '../models/Blog.js';
import generateTestToken from '../utils/generateToken.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Blog API', function() {
  this.timeout(10000); // Increased timeout to 10 seconds

  let testUser;
  let testToken;
  let blogId;

  before(async () => {
    // Clean up database before running tests
    await Blog.deleteMany({});

    // Create a test user and generate a JWT token for authentication
    testUser = {
      _id: '66b548a9b7a7d6e7fe1c8e0e', // Replace with actual test user ID
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };
    testToken = generateTestToken(testUser._id);
    console.log('Generated Test Token:', testToken);
  });

  it('should create a new blog post', (done) => {
    const blog = { title: 'First Blog Post', content: 'This is the content of the first blog post.', author: testUser._id };
    chai.request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testToken}`)
      .send(blog)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title').eql('First Blog Post');
        blogId = res.body._id; // Save the ID for later tests
        done();
      });
  });

  it('should get all blog posts', (done) => {
    chai.request(app)
      .get('/api/blogs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should get a blog post by id', (done) => {
    chai.request(app)
      .get(`/api/blogs/${blogId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title').eql('First Blog Post');
        done();
      });
  });

  it('should update a blog post by id', (done) => {
    chai.request(app)
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({ title: 'Updated Blog Post' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title').eql('Updated Blog Post');
        done();
      });
  });

  it('should delete a blog post by id', (done) => {
    chai.request(app)
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Blog post deleted');
        done();
      });
  });
});
