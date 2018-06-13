require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const passport = require('passport');
const passportSetup = require('./passportSetup');

const db = require('./database/helpers');

const app = express();
const { PORT, MOVIEDB } = process.env;
const MOVIE_API = 'https://api.themoviedb.org/3';

app.use(express.static('client'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
passportSetup(app);

const authenticate = (req, res, next) => (
  req.user ? next() : res.redirect('/login')
);

app.get('/', authenticate, (req, res) => {
  res.redirect('/login');
});

app.get('/movies', (req, res) => {
  const { movieId } = req.query;

  (movieId ? db.findMovie(movieId) : db.getAllMovies())
    .then(data => res.send({ data, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.post('/movies', (req, res) => {
  const { movieId } = req.body;

  !movieId
    ? res.status(400).send({ error: 'Expected body to include movieId' })
    : db.createMovie(movieId)
      .then(newMovie => res.send({ data: newMovie, error: null }))
      .catch(error => res.status(500).send({ error: error.message }));
});

app.delete('/movies', (req, res) => {
  const { movieId } = req.body;

  db.removeMovie(movieId)
    .then(() => res.send({ data: true, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.get('/search', (req, res) => {
  const { query } = req.query;

  axios.get(`${MOVIE_API}/search/movie?api_key=${MOVIEDB}&query=${query}`)
    .then(response => res.status(200).send(response.data))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.get('/searchVideo', (req, res) => {
  const { id } = req.query;
  axios.get(`${MOVIE_API}/movie/${id}/videos?api_key=${MOVIEDB}`)
    .then(response => res.status(200).send(response.data))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.get('/searchCast', (req, res) => {
  const { id } = req.query;
  axios.get(`${MOVIE_API}/movie/${id}/credits?api_key=${MOVIEDB}`)
    .then((response) => {
      const { cast, crew } = response.data;
      res.status(200).send({ cast, crew });
    })
    .catch(error => res.status(500).send({ error: error.message }));
});

app.post('/review', (req, res) => {
  const { movieId, userId, message } = req.body;

  db.addReview(movieId, { userId, message })
    .then(movie => res.send({ data: movie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.get('/auth', (req, res) => res.send({
  user: req.user || null,
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile'],
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('Gotcha boy');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(PORT, error => console.log(error || `Listening on port ${PORT}`));
