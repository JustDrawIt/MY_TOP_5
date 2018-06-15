angular.module('movie-shelf')
  .component('movieListEntry', {
    bindings: {
      userid: '<',
      movie: '<',
      pushit: '<',
    },
    // finish up this function
    controller: function controller() {
      console.log(this.userid);
      this.sendMovie = (movie) => {
        console.log(this);
        this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieListEntry.html',
  });
