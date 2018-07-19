angular.module('movie-shelf')
  .component('nowPlaying', {
    bindings: {
      userid: '<',
      pushit: '<',
      nowPlaying: '<',
      loadingNowPlaying: '<',
    },
    controller: function controller() {
    },
    templateUrl: '/templates/nowPlaying.html',
  });
