angular.module('movie-shelf')
  .service('TheMovieDB', function TheMovieDB($http) {
    this.search = query => new Promise((resolve, reject) => {
      $http.get('/search', { params: { query } })
        .then((response) => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });

    this.getMovie = (movieId) => {
      return $http
        .get(`/search/movies?id=${movieId}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.searchVideos = id => new Promise((resolve, reject) => {
      $http.get('/search/video', { params: { id } })
        .then((response) => {
          // resolves an array of video reference objects
          resolve(response.data.results);
        })
        .catch(err => reject(err));
    });

    this.getUpcoming = () => new Promise((resolve, reject) => {
      $http.get('/search/upcoming')
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });

    this.getNowPlaying = () => new Promise((resolve, reject) => {
      $http.get('/search/nowPlaying')
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });


    this.searchCast = id => new Promise((resolve, reject) => {
      $http.get('/search/cast', { params: { id } })
        .then((response) => {
        // resolves an object with arrays on .cast and .crew  of objects containing data about the cast
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  })
  .service('server', function server($http) {
    this.getTopMovies = () => $http.get('/movies')
      .then(response => response.data.data)
      .then(movies => movies.sort((a, b) => {
        if (a.favorites === b.favorites) return 0;
        return a.favorites > b.favorites ? -1 : 1;
      }))
      .then(topMovies => topMovies.slice(0, 5))
      .then(movies => movies.map(movie =>
        $http.get(`/search/movies?id=${movie.movieId}`)
          .then(response => ({ ...response.data, ...movie }))))
      .then(moviesPromises => Promise.all(moviesPromises));

    this.addReview = (message, movieId, userId, callback) => {
      return $http
        .post('/reviews', {
          message, movieId, userId,
        })
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };


    this.addFavorite = (movieId, userId, callback) => {
      return $http
        .post(`/movies/${movieId}/favorite`, {  userId })
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.deleteMovie = (movieId, userId, callback) => {
      return $http({
        method: 'DELETE',
        url: `/movies/${movieId}/favorite?userId=${userId}`,
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
      })
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  })
  .service('checkAuth', function checkAuth($http) {
    this.check = (callback) => {
      $http.get('/auth')
        .then(({ data }) => {
          callback(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  });
