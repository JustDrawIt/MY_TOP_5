angular.module('movie-shelf')
  .component('shelf', {
    bindings: {
      myMovies: '<',
      spliceit: '<',
    },
    controller: function controller(server) {

    },
    templateUrl: '/templates/shelf.html',
  });
