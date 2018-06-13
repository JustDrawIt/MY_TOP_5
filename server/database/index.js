const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useMongoClient: true })

const db = mongoose.connection;
db.on('error', error => console.error('Connection to database unsuccessful', error));
db.once('open', () => console.log(`Connection to database successful: ${MONGO_URI}`));

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

const userSchema = mongoose.Schema({
  googleId: String,
  username: {
    type: String,
    required: true,
  },
  favorites: {
    type: [{ movieId: Number }],
    default: [],
  },
  reviews: {
    type: [{ reviewId: String }],
    default: [],
  },
});

const reviewSchema = mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports.User = User;
module.exports.Movie = Movie;
module.exports.Review = Review;
