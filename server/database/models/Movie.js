const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  movieId: {
    type: Number,
    unique: true,
    required: true,
  },
  favorites: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [{ reviewId: String }],
    default: [],
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
