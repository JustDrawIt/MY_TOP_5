require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/review`;

describe('review', () => {
  describe('on post', () => {
    const movieId = 4343;

    beforeEach((done) => {
      new Movie({ movieId })
        .save()
        .then(() => done());
    });

    afterEach((done) => {
      Movie.findOneAndRemove({ movieId })
        .exec()
        .then(() => done());
    });

    it('creates a review', (done) => {
      const review = { message: 'This movie sucked!', userId: 3434 };

      axios.post(endpoint, { movieId, ...review })
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.exist;
        })
        .then(() => Movie.findOne({ movieId }))
        .then((updatedMovie) => {
          const newReview = updatedMovie.reviews[0];

          expect(newReview).to.exist;
          expect(newReview.message).to.equal(review.message);
          expect(newReview.userId).to.equal(review.userId);

          done();
        });
    });

    it('should not create a review when already posted one', (done) => {
      const userId = 3434;
      const review1 = { message: 'This movie sucked!', userId };
      const review2 = { message: 'I changed my mind...it\'s not that bad', userId };

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
