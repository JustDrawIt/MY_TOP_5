const mongoose = require('mongoose');

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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
