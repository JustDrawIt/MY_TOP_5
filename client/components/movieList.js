angular.module('movie-shelf')
  .component('movieList', {
    bindings: {
      userid: '<',
      movies: '<',
      pushit: '<',
      moviesDb: '<',
      loadingSearch: '<',
    },
    controller: function controller() {
    },
    templateUrl: '/templates/movieList.html',
  });
