const express = require('express');
const passport = require('passport');

const auth = express.Router();

auth.get('/', (req, res) => res.send({ user: req.user || null }));
auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})
auth.get('/google', passport.authenticate('google', { scope: ['profile'] }));
auth.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/'));

module.exports = auth;
