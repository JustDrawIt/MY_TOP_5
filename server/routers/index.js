const moviesRouter = require('./movies');
const usersRouter = require('./users');
const reviewsRouter = require('./reviews');
const searchRouter = require('./search');

module.exports = (app) => {
  app.use('/movies', moviesRouter);
  app.use('/users', usersRouter);
  app.use('/reviews', reviewsRouter);
  app.use('/search', searchRouter);
};
