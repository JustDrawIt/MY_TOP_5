const { Movie } = require('./');

const getAllMovies = () => Movie.find().exec();
const findMovie = movieId => Movie.findOne({ movieId })
  .exec()
  .then(movie => movie || Promise.reject(new Error(`No movie found with movieId: ${movieId}`)));
const createMovie = (movieId) => {
  const newMovie = new Movie({ movieId });
  return newMovie.save();
};
const removeMovie = movieId => Movie.findOneAndRemove({ movieId }).exec();

const addReview = (movieId, review) => findMovie(movieId)
  .then((movie) => {
    const userAlreadyReviewed = !!movie.reviews.find(oldReview => oldReview.userId === review.userId);

    if (userAlreadyReviewed) {
      return Promise.reject(new Error('User has already reviewed movie'));
    }

    movie.reviews.push(review);
    return movie.save();
  });

module.exports.getAllMovies = getAllMovies;
module.exports.findMovie = findMovie;
module.exports.createMovie = createMovie;
module.exports.removeMovie = removeMovie;
module.exports.addReview = addReview;
