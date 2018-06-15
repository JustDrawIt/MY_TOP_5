angular.module('movie-shelf')
  .component('nowUpcoming', {
    bindings: {
      upcoming: '<',
      nowPlaying: '<',
    },
    controller: function controller() {
      setInterval(() => { console.log(this.upcoming, this.nowPlaying); }, 5000);
    },
    templateUrl: '/templates/nowUpcoming.html',
  });
