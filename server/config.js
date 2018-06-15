require('dotenv').config();

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PROTOCAL = IS_PRODUCTION ? process.env.PROTOCAL : 'http';
const HOST = IS_PRODUCTION ? process.env.HOST : 'localhost';
const PORT = process.env.PORT || 8080;
const URL = `${PROTOCAL}://${HOST}:${PORT}`;

module.exports = {
  PROTOCAL,
  HOST,
  PORT,
  URL,
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
  AXIOS_CONFIG: {
    baseURL: URL,
    withCredentials: true,
  },
};
