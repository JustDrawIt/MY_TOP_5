const express = require('express');
const db = require('../database/helpers');

const users = express.Router();

users.get('/:userId', (req, res) => {
  const { userId } = req.params;

  db.findUserById(userId)
    .then(user => res.send({ data: user, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

module.exports = users;
