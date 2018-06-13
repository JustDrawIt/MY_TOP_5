angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    controller: function controller() {
      this.sendMovie = (movie) => {
        this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
