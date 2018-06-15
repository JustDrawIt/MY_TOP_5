angular.module('movie-shelf')
  .component('movieList', {
    bindings: {
      userid: '<',
      movies: '<',
      pushit: '<',
      moviesDb: '<',
    },
    controller: function () {
    },
    templateUrl: '/templates/movieList.html',
  });
