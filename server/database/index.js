const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', error => console.error('Connection to database unsuccessful', error));
db.once('open', () => console.log(`Connection to database successful: ${MONGO_URI}`));

module.exports = mongoose;
