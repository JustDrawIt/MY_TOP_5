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

module.exports.getAllMovies = getAllMovies;
module.exports.findMovie = findMovie;
module.exports.createMovie = createMovie;
module.exports.removeMovie = removeMovie;
module.exports.favoriteMovie = favoriteMovie;
module.exports.addReview = addReview;
