const express = require('express');
const db = require('../database/helpers');

const reviews = express.Router();

reviews.get('/', (req, res) => {
  const { movieId, userId } = req.query;
  let query;

  if (movieId) {
    query = db.getAllMovieReviews(movieId);
  } else if (userId) {
    query = db.getAllUserReviews(userId);
  } else {
    query = db.getAllReviews();
  }

  query
    .then(data => res.send({ data, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

reviews.get('/:reviewId', (req, res) => {
  const { reviewId } = req.params;

  db.getReview(reviewId)
    .then(review => res.send({ data: review, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

reviews.post('/', (req, res) => {
  const { movieId, userId, message } = req.body;

  db.addReview({ movieId, userId, message })
    .then(movie => res.send({ data: movie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

module.exports = reviews;
