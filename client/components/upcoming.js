angular.module('movie-shelf')
  .component('upcoming', {
    bindings: {
      userid: '<',
      pushit: '<',
      upcoming: '<',
      loadingUpcoming: '<',
    },
    controller: function controller() {
    },
    templateUrl: '/templates/upcoming.html',
  });
