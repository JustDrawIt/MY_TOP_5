angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    controller: function controller() {
      $(document).ready(() => {
        const elems = document.querySelectorAll('.slider');
        $('.modal').modal();
        $('.slider').slider();
        elems.forEach((elem) => {
          const instance = M.Slider.getInstance(elem);
          instance.pause();
        });
      });
      this.sendMovie = (movie) => {
        console.log(movie);
        // this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
