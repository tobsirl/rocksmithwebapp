import supertest from 'supertest';
import {app} from './../server.js';
import should from "should"; // eslint-disable-line
// UNIT test begin
describe('Users API unit test', function() {
  this.timeout(120000); // eslint-disable-line
  // #1 return a collection of json documents
  it('should return collection of JSON documents', function(done) {
    // calling home page api
    supertest(app)
      .get('/api/users/test')
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });
});

// #2 add a contact
it('should register a user', function(done) {
  // post to /api/contacts
  supertest(app)
    .post('/api/users/register')
    .send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      password2: '123456',
    })
    .expect('Content-type', /json/)
    .expect(201)
    .end(function(err, res) {
      res.status.should.equal(201);
      res.body.should.have.property('_id');
      res.body.name.should.equal('John Doe');
      done();
    });
});
