const moviesRouter = require('./movies');
const usersRouter = require('./users');
const reviewsRouter = require('./reviews');
const searchRouter = require('./search');
const authRouter = require('./auth');
const logoutRouter = require('./logout');

module.exports = (app) => {
  app.use('/movies', moviesRouter);
  app.use('/users', usersRouter);
  app.use('/reviews', reviewsRouter);
  app.use('/search', searchRouter);
  app.use('/auth', authRouter);
  app.use('/logout', logoutRouter);
};
