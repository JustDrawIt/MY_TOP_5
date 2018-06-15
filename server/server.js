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

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  db.findUserById(userId)
    .then(user => res.send({ data: user, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
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
    .then((response) => {
      const { data } = response;
      res.status(200).send(data.results.slice(0, 15));
    })
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

app.get('/nowPlaying', (req, res) => {
  axios.get(`${MOVIE_API}/movie/now_playing?api_key=${MOVIEDB}&language=en-US&page=1`)
    .then((response) => {
      const { data } = response;
      res.status(200).send(data.results.slice(0, 15));
    })
    .catch(error => res.status(500).send({ error: error.message }));
});

app.get('/upcoming', (req, res) => {
  axios.get(`${MOVIE_API}/movie/upcoming?api_key=${MOVIEDB}&language=en-US&page=1`)
    .then((response) => {
      const { data } = response;
      const dateToday = new Date();
      const upcomingMovies = data.results.filter(movie => new Date(movie.release_date) > dateToday);
      res.status(200).send(upcomingMovies);
    })
    .catch(error => res.status(500).send({ error: error.message }));
});


app.post('/favorite', (req, res) => {
  const { userId, movieId } = req.body;

  db.favoriteMovie(movieId, userId)
    .then(movie => res.send({ data: movie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.delete('/favorite', (req, res) => {
  const { userId, movieId } = req.query;

  db.unfavoriteMovie(Number(movieId), userId)
    .then(() => res.send({ data: true, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.get('/reviews', (req, res) => {
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

app.get('/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;

  db.getReview(reviewId)
    .then(review => res.send({ data: review, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.post('/reviews', (req, res) => {
  const { movieId, userId, message } = req.body;

  db.addReview({ movieId, userId, message })
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
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(PORT, error => console.log(error || `Listening on port ${PORT}`));
