const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_OPTS: {
    secret: process.env.SESSION_SECRET || 'yahamamam',
    cookie: {
      maxAge: 86400000, // 1d
    },
  },
  MOVIE_DB_API: {
    ENDPOINT: 'https://api.themoviedb.org/3',
    KEY: process.env.MOVIE_DB_API_KEY,
  },
  GOOGLE_AUTH: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
};
