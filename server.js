require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database/helpers');

const app = express();
const { PORT } = process.env;

app.use(express.static('client'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

app.get('/shelf', (req, res) => {
  db.getAllMovies()
    .then(movies => res.send({ data: movies, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.post('/shelf', (req, res) => {
  db.createMovie(req.body.params.movie)
    .then(newMovie => res.send({ data: newMovie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

app.delete('/shelf', (req, res) => {
  db.removeMovie(movieId)
    .then(data => res.send({ data, error: null }))
    .catch(error => res.status(500).send({ error: error.message }))
});

app.post('/review', (req, res) => {
  const { movieId, userId, message } = req.body;

  db.addReview(movieId, { userId, message })
    .then(movie => res.send({ data: movie, error: null }))
    .catch(error => res.status(500).send({ error: error.message }))
});

app.listen(PORT, error => console.log(error || `Listening on port ${PORT}`));

