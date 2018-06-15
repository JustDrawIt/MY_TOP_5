const axios = require('axios');
const { AXIOS_CONFIG } = require('./config');

const instance = axios.create(AXIOS_CONFIG);

module.exports = instance;
