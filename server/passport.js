const passport = require('passport');
const session = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('./database');
const { SESSION_OPTS, GOOGLE_AUTH } = require('./config');

module.exports = (app) => {
  app.use(session(SESSION_OPTS));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error));
  });

  passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: GOOGLE_AUTH.CLIENT_ID,
    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(currentUser => currentUser || new User({
        username: profile.displayName,
        googleId: profile.id,
      }).save())
      .then(user => done(null, user))
      .catch(error => done(error));
  }));
};
