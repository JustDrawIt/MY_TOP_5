angular.module('movie-shelf')
  .component('movieList', {
    bindings: {
      userid: '<',
      movies: '<',
      pushit: '<',
      moviesDb: '<',
    },
    controller: function controller() {
    },
    templateUrl: '/templates/movieList.html',
  });
