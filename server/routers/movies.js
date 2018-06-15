const express = require('express');
const db = require('../database/helpers');

const movies = express.Router();

movies.get('/', (req, res) => {
  const { movieId } = req.query;

  (movieId ? db.findMovie(movieId) : db.getAllMovies())
    .then(data => res.send({ data, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

movies.post('/', (req, res) => {
  const { movieId } = req.body;

  !movieId
    ? res.status(400).send({ error: 'Expected body to include movieId' })
    : db.createMovie(movieId)
      .then(newMovie => res.send({ data: newMovie, error: null }))
      .catch(error => res.status(500).send({ error: error.message }));
});

movies.delete('/', (req, res) => {
  const { movieId } = req.body;

  db.removeMovie(movieId)
    .then(() => res.send({ data: true, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

movies.post('/:movieId/favorite', (req, res) => {
  const { movieId } = req.params;
  const { userId } = req.body;

  db.favoriteMovie(movieId, userId)
    .then(movie => res.send({ data: movie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

module.exports = movies;
