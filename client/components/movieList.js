angular.module('movie-shelf')
  .component('movieList', {
    bindings: {
      movies: '<',
      pushit: '<',
      moviesDb: '<',
    },
    controller: function () {
    },
    templateUrl: '/templates/movieList.html',
  });
