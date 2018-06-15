angular.module('movie-shelf')
  .component('nowUpcoming', {
    bindings: {
      upcoming: '<',
      nowPlaying: '<',
    },
    controller: function controller() {
    },
    templateUrl: '/templates/nowUpcoming.html',
  });
