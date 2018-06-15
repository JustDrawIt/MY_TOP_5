const express = require('express');
const bodyParser = require('body-parser');

const setupPassport = require('./passport');
const setupRouters = require('./routers');

const app = express();

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(express.static('client'));

setupPassport(app);
setupRouters(app);

module.exports.server = app;
