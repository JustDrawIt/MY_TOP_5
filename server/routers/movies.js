const express = require('express');
const axios = require('../axios');
const db = require('../database/helpers');

const movies = express.Router();

movies.get('/', (req, res) => {
  let { movieId } = req.query;

  movieId = Number(movieId);

  (movieId ? db.findMovie(movieId) : db.getAllMovies())
    .then(data => res.send({ data, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

movies.post('/', (req, res) => {
  let { movieId } = req.body;

  movieId = Number(movieId);

  !movieId
    ? res.status(400).send({ error: 'Expected body to include movieId' })
    : db.createMovie(movieId)
      .then(newMovie => res.send({ data: newMovie, error: null }))
      .catch(error => res.status(500).send({ error: error.message }));
});

movies.delete('/', (req, res) => {
  let { movieId } = req.body;

  movieId = Number(movieId);

  db.removeMovie(movieId)
    .then(() => res.send({ data: true, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

movies.post('/:movieId/favorite', (req, res) => {
  const { userId } = req.body;
  let { movieId } = req.params;

  movieId = Number(movieId);

  axios.get(`/movies?movieId=${movieId}`)
    .catch(() => axios.post('http://localhost:8080/movies', { movieId }))
    .then(() => db.favoriteMovie(movieId, userId))
    .then(movie => res.send({ data: movie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

movies.delete('/:movieId/favorite', (req, res) => {
  const { userId } = req.query;
  let { movieId } = req.params;

  movieId = Number(movieId);

  db.unfavoriteMovie(movieId, userId)
    .then(() => res.send({ data: true, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

module.exports = movies;
