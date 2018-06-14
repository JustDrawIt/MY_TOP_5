require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { User } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/users`;

describe('users', () => {
  describe('on get', () => {
    const username = 'bob';
    let userId;

    beforeEach((done) => {
      new User({ username })
        .save()
        .then((user) => {
          userId = user._id.toString();
          done();
        });
    });

    it('should return the user', (done) => {
      axios.get(`${endpoint}/${userId}`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.be.a('object');
          expect(response.data.data._id).to.equal(userId);
          expect(response.data.data.username).to.equal(username);

          done();
        });
    });

    it('should return error if there is no user found', (done) => {
      axios.get(`${endpoint}/not-a-real-user`)
        .catch((error) => {
          expect(error).to.exist;
          expect(error.response.status).to.equal(500);
          expect(error.response.data.error).to.be.a('string');

          done();
        });
    });
  });
});
