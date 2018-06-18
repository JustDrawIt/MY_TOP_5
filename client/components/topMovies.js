angular.module('movie-shelf')
  .component('topMovies', {
    bindings: {
      userid: '<',
      pushit: '<',
    },
    controller: function (server) {
      this.movies = [];
      this.getMovies = () => server.getTopMovies()
        .then(movies => movies.map((movie) => {
          movie.posterUrl = movie.posterUrl || `http://image.tmdb.org/t/p/w500${movie.poster_path}`
          return movie;
        }))
        .then(movies => this.movies = movies);
      this.getMovies();
    },
    templateUrl: '/templates/topMovies.html',
  });
