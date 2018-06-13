const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./database/index');
const session = require('cookie-session');

module.exports = (app) => {
  app.use(session({
    secret: 'yahamamam',
    cookie: {
      maxAge: 86400000, // 1 day
    },
  }));
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
    clientID: process.env.ClientID,
    clientSecret: process.env.Secret,
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    User.findOne({
      googleId: profile.id,
    })
      .then(currentUser => currentUser || new User({
        username: profile.displayName,
        googleId: profile.id,
      }).save())
      .then(user => done(null, user))
      .catch(error => done(error));
  }));
};
