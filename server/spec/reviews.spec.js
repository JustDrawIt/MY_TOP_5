const axios = require('axios');
const { expect } = require('chai');

const { Movie, User, Review } = require('../database/models');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/reviews`;

describe('reviews', () => {
  describe('on get', () => {
    const movieId1 = 100000;
    const movieId2 = 100001;
    const userId1 = 'aaaaaaaaaa';
    const userId2 = 'aaaaaaaaab';
    const reviews = [
      {
        movieId: movieId1,
        userId: userId1,
        message: 'This movie was okay...',
      },
      {
        movieId: movieId2,
        userId: userId1,
        message: 'A fantasic movie!',
      },
      {
        movieId: movieId1,
        userId: userId2,
        message: 'Such a great movie.',
      },
      {
        movieId: movieId2,
        userId: userId2,
        message: 'I recommend this movie to everyone.',
      },
    ];
    let reviewIds = [];

    beforeEach((done) => {
      Promise.all(reviews.map(review =>
        new Review(review).save().then(savedReview => savedReview._id.toString()))
      ).then((ids) => {
        reviewIds = ids;
        done();
      });
    });

    afterEach(() => Promise.all(reviewIds.map(id => Review.findByIdAndRemove(id).exec())));

    it('should return all reviews', (done) => {
      axios.get(endpoint).then(({ status, data }) => {
        const { data: allReviews, error } = data;

        expect(status).to.equal(200);
        expect(error).to.be.null;
        expect(allReviews).to.be.an('array');
        expect(allReviews.length).to.be.at.least(reviews.length);

        done();
      });
    });

    it('should return all the reviews for a movie', (done) => {
      Promise.all([
        axios.get(`${endpoint}?movieId=${movieId1}`),
        axios.get(`${endpoint}?movieId=${movieId2}`),
      ]).then(([reviewsResponse1, reviewsResponse2]) => {
        const { status: reviewsStatus1, data: reviewsData1 } = reviewsResponse1;
        const { status: reviewsStatus2, data: reviewsData2 } = reviewsResponse2;

        expect(reviewsStatus1).to.equal(200);
        expect(reviewsStatus2).to.equal(200);

        expect(reviewsData1.error).to.be.null;
        expect(reviewsData2.error).to.be.null;

        expect(reviewsData1.data).to.be.an('array');
        expect(reviewsData2.data).to.be.an('array');

        done();
      });
    });

    it('should return all reviews for a user', (done) => {
      Promise.all([
        axios.get(`${endpoint}?userId=${userId1}`),
        axios.get(`${endpoint}?userId=${userId2}`),
      ]).then(([reviewsResponse1, reviewsResponse2]) => {
        const { status: reviewsStatus1, data: reviewsData1 } = reviewsResponse1;
        const { status: reviewsStatus2, data: reviewsData2 } = reviewsResponse2;

        expect(reviewsStatus1).to.equal(200);
        expect(reviewsStatus2).to.equal(200);

        expect(reviewsData1.error).to.be.null;
        expect(reviewsData2.error).to.be.null;

        expect(reviewsData1.data).to.be.an('array');
        expect(reviewsData2.data).to.be.an('array');

        done();
      });
    });
  });

  describe('on get /:reviewId', () => {
    let reviewId;

    beforeEach((done) => {
      new Review({
        movieId: 123132,
        userId: 'asdasdweaewqqqeqe',
        message: 'I love this movie!',
      }).save().then((savedReview) => {
        reviewId = savedReview._id.toString();
        done();
      });
    });

    afterEach((done) => {
      Review.findByIdAndRemove(reviewId)
        .exec()
        .then(() => done());
    });

    it('returns review', (done) => {
      axios.get(`${endpoint}/${reviewId}`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data._id).to.equal(reviewId);
          done();
        });
    });
  });

  describe('on post', () => {
    const movieId = 34343;
    const username = 'Bob';
    let movieMongoId = null;
    let userMongoId = null;

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

    afterEach(() => Promise.all([
      Movie.deleteMany().exec(),
      User.deleteMany().exec(),
      Review.deleteMany().exec(),
    ]));

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
