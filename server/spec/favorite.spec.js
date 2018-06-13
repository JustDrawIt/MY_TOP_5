require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie, User } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/favorite`;

describe('favorite', () => {
  describe('on post', () => {
    const movieId = 33333;
    const username = 'Bob';
    let movieMongoId;
    let userMongoId;

    beforeEach((done) => {
      Promise.all([
        new Movie({ movieId }).save(),
        new User({ username }).save(),
      ]).then(([movie, user]) => {
        movieMongoId = movie._id;
        userMongoId = user._id;
        done();
      });
    });

    afterEach((done) => {
      Promise.all([
        Movie.findByIdAndRemove(movieMongoId),
        User.findByIdAndRemove(userMongoId),
      ]).then(() => done());
    });

    it('updates the movie favorites', (done) => {
      axios.post(endpoint, { userId: userMongoId, movieId })
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.data).to.be.an('object');
          expect(response.data.data.movieId).to.equal(movieId);
          expect(response.data.data.favorites).to.equal(1);

          done();
        });
    });
  });
});
