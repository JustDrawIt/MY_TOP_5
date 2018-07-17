angular.module('movie-shelf')
  .component('nowUpcoming', {
    bindings: {
      userid: '<',
      pushit: '<',
      upcoming: '<',
      nowPlaying: '<',
      loadingNowPlaying: '<',
      loadingUpcoming: '<',
    },
    controller: function controller() {
    },
    templateUrl: '/templates/nowUpcoming.html',
  });
