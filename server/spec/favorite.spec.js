require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie, User } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/favorite`;

describe('favorite', () => {
  const movieId = 44444;
  const username = 'Bob';
  let movieMongoId;
  let userMongoId;

  beforeEach((done) => {
    Promise.all([
      new Movie({ movieId }).save(),
      new User({ username }).save(),
    ]).then(([movie, user]) => {
      movieMongoId = movie._id.toString();
      userMongoId = user._id.toString();
      done();
    });
  });

  afterEach((done) => {
    Promise.all([
      Movie.findByIdAndRemove(movieMongoId),
      User.findByIdAndRemove(userMongoId),
    ]).then(() => done());
  });

  describe('on post', () => {
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

    it('returns error if already favorited', (done) => {
      axios.post(endpoint, { movieId, userId: userMongoId })
        .then(() => axios.post(endpoint, { movieId, userId: userMongoId }))
        .catch((error) => {
          expect(error).to.exist;
          expect(error.response.status).to.equal(500);
          expect(error.response.data.error).to.be.a('string');

          done();
        });
    });
  });

  describe('on delete', () => {
    it('should delete a user\'s favorite', (done) => {
      const payload = { movieId, userId: userMongoId };

      axios.post(endpoint, payload)
        .then(() => axios.delete(endpoint, { params: payload }))
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.be.true;

          done();
        });
    });
  });
});
