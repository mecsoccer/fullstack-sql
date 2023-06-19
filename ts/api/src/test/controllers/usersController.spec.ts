import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import {
  validUserLogin,
  userLogin,
  invalidLogin,
  validUser,
  invalidEmail,
  weakPassword,
  invalidEmailLogin,
  invalidFirstName,
  invalidLastName,
  existingUser,
} from '../mocks/users.mock';

chai.use(chaiHttp);
const { expect } = chai;

let accessToken;
let userAccessToken;

describe('Tests for User Routes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send(validUserLogin)
      .end((_, res) => {
        accessToken = 'bearer ' + res.body.accessToken;
      });
    chai.request(app)
      .post('/api/v1/login')
      .send(userLogin)
      .end((_, res) => {
        userAccessToken = 'bearer ' + res.body.accessToken;
        done();
      });
  });

  describe('tests for sign up route', () => {
    it('#should return 201 and created object if data is valid', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .set('Authorization', accessToken)
        .send(validUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('accessToken').that.is.a('string');
          expect(res.body).to.have.property('token').that.is.a('string');
          done();
        });
    });

    it('should return 409 if email already exists', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .set('Authorization', accessToken)
        .send(existingUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error').that.is.an('string');
          done();
        });
    });

    it('should return 422, error message and email as error field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .set('Authorization', accessToken)
        .send(invalidEmail)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.an('array');
          expect(res.body.error[0]).to.have.property('path').that.equals('email');
          done();
        });
    });

    it('should return 422, error message and password as error field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .set('Authorization', accessToken)
        .send(weakPassword)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.an('array');
          expect(res.body.error[0]).to.have.property('path').that.equals('password');
          done();
        });
    });
    
    it('should return 422, error message and first_name as error field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .set('Authorization', accessToken)
        .send(invalidFirstName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.an('array');
          expect(res.body.error[0]).to.have.property('path').that.equals('first_name');
          done();
        });
    });
    
    it('should return 422, error message and last_name as error field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .set('Authorization', accessToken)
        .send(invalidLastName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.an('array');
          expect(res.body.error[0]).to.have.property('path').that.equals('last_name');
          done();
        });
    });
  });

  describe('tests for sign in route', () => {
    it('# should login user if data is correct', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send(validUserLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('accessToken').that.is.a('string');
          expect(res.body).to.have.property('token').that.is.a('string');
          done();
        });
    });

    it('# should return 401 and error message for incorrect email', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send(invalidLogin)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('# should return 422 and error message for invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send(invalidEmailLogin)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.an('array');
          expect(res.body.error[0]).to.have.property('path').that.equals('email');
          done();
        });
    });
  });
});
