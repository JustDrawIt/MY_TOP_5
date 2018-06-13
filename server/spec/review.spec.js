require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie, User, Review } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/review`;

describe('review', () => {
  describe('on post', () => {
    const movieId = 34343;
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
        Movie.deleteMany().exec(),
        User.deleteMany().exec(),
        Review.deleteMany().exec(),
      ]).then(() => done());
    });

    it('creates a review', (done) => {
      const payload = {
        message: 'This movie sucked!',
        userId: userMongoId,
        movieId,
      };

      axios.post(endpoint, payload)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.exist;

          done();
        });
    });

    it('should not create a review when already posted one', (done) => {
      const review1 = { message: 'This movie sucked!', userId: userMongoId };
      const review2 = { message: 'I changed my mind...it\'s not that bad', userId: userMongoId };

      axios.post(endpoint, { movieId, ...review1 })
        .then(() => axios.post(endpoint, { movieId, ...review2 }))
        .catch((error) => {
          expect(error).to.exist;
          expect(error.response.status).to.equal(500);
          expect(error.response.data.error).to.be.a('string');

          done();
        });
    });
  });
});
