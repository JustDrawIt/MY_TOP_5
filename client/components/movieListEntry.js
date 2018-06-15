angular.module('movie-shelf')
  .component('movieListEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    // finish up this function
    controller: function controller() {
      this.sendMovie = (movie) => {
        console.log(this);
        this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieListEntry.html',
  });
