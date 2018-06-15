const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;
