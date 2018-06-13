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
    type: [{
      message: String,
      userId: Number,
    }],
    default: [],
  },
});

const Movie = mongoose.model('Movie', movieSchema);

const userSchema = mongoose.Schema({
  username: String,
  googleId: String,
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.Movie = Movie;
