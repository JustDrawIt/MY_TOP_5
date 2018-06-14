angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    controller: function controller() {
      $(document).ready(() => {
        $('.modal').modal();
      });
      this.sendMovie = (movie) => {
        this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
