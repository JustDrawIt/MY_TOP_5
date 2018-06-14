const { Movie, User, Review } = require('./');

const findUserById = userId => User.findById(userId)
  .exec()
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

const unfavoriteMovie = (movieId, userId) => findUserById(userId)
  .then((user) => {
    const favoritedIndex = user.favorites.findIndex(movie => movie.movieId === movieId);

    if (favoritedIndex === -1) return Promise.reject(new Error('Cannot unfavorite movie that is not already favorited'));
    user.favorites.splice(favoritedIndex, 1);
    return user.save();
  })
  .then(() => findMovie(movieId))
  .then((movie) => {
    movie.favorites -= 1;
    return movie.save();
  });
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

const getReview = reviewId => Review.findById(reviewId)
  .exec()
  .then(review => review || Promise.reject(new Error(`No review found with reviewId: ${reviewId}`)));
const getAllMovieReviews = movieId => Review.find({ movieId }).exec();
const getAllUserReviews = userId => Review.find({ userId }).exec();
const getAllReviews = () => Review.find().exec();
const createReview = review => new Review(review).save();
const addReview = ({ movieId, userId, message }) => Review.findOne({ movieId, userId })
  .then((review) => {
    if (review) return Promise.reject(new Error(`User with userId of ${userId} has already reviewed movie with movieId of ${movieId}`));
    return createReview({ movieId, userId, message });
  })
  .then(newReview => Promise.all([
    findMovie(newReview.movieId).then((movie) => {
      movie.reviews.push({ reviewId: newReview._id });
      return movie.save();
    }),
    findUserById(newReview.userId).then((user) => {
      user.reviews.push({ reviewId: newReview._id });
      return user.save();
    }),
  ]).then(() => newReview));

module.exports.findUserById = findUserById;
module.exports.getAllMovies = getAllMovies;
module.exports.findMovie = findMovie;
module.exports.createMovie = createMovie;
module.exports.removeMovie = removeMovie;
module.exports.favoriteMovie = favoriteMovie;
module.exports.unfavoriteMovie = unfavoriteMovie;
module.exports.getReview = getReview;
module.exports.getAllMovieReviews = getAllMovieReviews;
module.exports.getAllUserReviews = getAllUserReviews;
module.exports.getAllReviews = getAllReviews;
module.exports.addReview = addReview;
