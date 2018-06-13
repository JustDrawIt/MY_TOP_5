const { Movie, User, Review } = require('./');

const findUserById = userId => User.findById(userId)
  .then(user => user || Promise.reject(new Error(`No user found with userId of ${userId}`)));

const getAllMovies = () => Movie.find().exec();
const findMovie = movieId => Movie.findOne({ movieId })
  .exec()
  .then(movie => movie || Promise.reject(new Error(`No movie found with movieId: ${movieId}`)));
const createMovie = (movieId) => {
  const newMovie = new Movie({ movieId });
  return newMovie.save();
};
const removeMovie = movieId => Movie.findOneAndRemove({ movieId }).exec();

const favoriteMovie = (movieId, userId) => findUserById(userId)
  .then((user) => {
    const hasAlreadyFavorited = !!user.favorites.find(movie => movie.movieId === movieId);
    if (hasAlreadyFavorited) return Promise.reject(new Error(`User has already favorited movie with movieId of ${movieId}`));
    user.favorites.push({ movieId });
    return user.save();
  })
  .then(() => findMovie(movieId))
  .then((movie) => {
    movie.favorites += 1;
    return movie.save();
  });

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
module.exports.favoriteMovie = favoriteMovie;
module.exports.addReview = addReview;
