angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    // finish up this function
    controller: function controller() {
      console.log('DB CONTROLLER');
      this.sendMovie = (movie) => {
        this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
