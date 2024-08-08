import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import Forum from '../models/Forum.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Forum API', () => {
  before(async () => {
    await Forum.deleteMany({});
  });

  it('should create a new forum', (done) => {
    chai.request(app)
      .post('/api/forums')
      .send({ title: 'New Forum', description: 'This is a new forum.', user: 'testuser' })
      .end((err, res) => {
        if (err) {
          console.error(`Error in create forum test: ${err.message}`);
        }
        console.log(res.body);  // Log the response body
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title').eql('New Forum');
        done();
      });
  });

  it('should get all forums', (done) => {
    chai.request(app)
      .get('/api/forums')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get a forum by id', (done) => {
    const forum = new Forum({ title: 'Existing Forum', description: 'This is an existing forum.', user: 'testuser' });
    forum.save((err, forum) => {
      if (err) {
        console.error(`Error in save forum test: ${err.message}`);
      }
      chai.request(app)
        .get(`/api/forums/${forum._id}`)
        .end((err, res) => {
          if (err) {
            console.error(`Error in get forum by id test: ${err.message}`);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title').eql('Existing Forum');
          done();
        });
    });
  });

  it('should update a forum by id', (done) => {
    const forum = new Forum({ title: 'Update Forum', description: 'This is a forum to update.', user: 'testuser' });
    forum.save((err, forum) => {
      if (err) {
        console.error(`Error in save forum for update test: ${err.message}`);
      }
      chai.request(app)
        .put(`/api/forums/${forum._id}`)
        .send({ title: 'Updated Forum' })
        .end((err, res) => {
          if (err) {
            console.error(`Error in update forum test: ${err.message}`);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title').eql('Updated Forum');
          done();
        });
    });
  });

  it('should delete a forum by id', (done) => {
    const forum = new Forum({ title: 'Delete Forum', description: 'This is a forum to delete.', user: 'testuser' });
    forum.save((err, forum) => {
      if (err) {
        console.error(`Error in save forum for delete test: ${err.message}`);
      }
      chai.request(app)
        .delete(`/api/forums/${forum._id}`)
        .end((err, res) => {
          if (err) {
            console.error(`Error in delete forum test: ${err.message}`);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Forum deleted');
          done();
        });
    });
  });
});
