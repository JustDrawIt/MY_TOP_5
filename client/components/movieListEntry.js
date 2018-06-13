angular.module('movie-shelf')
  .component('movieListEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    // finish up this function
    controller: function controller() {
      this.sendMovie = (movie) => {
        console.log('were making it this far');
        console.log('this', this);
        this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieListEntry.html',
  });
