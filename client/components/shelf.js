angular.module('movie-shelf')
  .component('shelf', {
    bindings: {
      userid: '<',
      myMovies: '<',
      spliceit: '<',
    },
    controller: function controller(server) {

    },
    templateUrl: '/templates/shelf.html',
  });
