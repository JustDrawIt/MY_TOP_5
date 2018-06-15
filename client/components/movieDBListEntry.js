angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    controller: function controller($element) {
      const ctrl = this;
      let modalInstance = null;
      ctrl.movie.openModal = () => {
        $('.modal').modal();
        $('.slider').slider();
        const sliderElem = $element.find('.slider')[0];
        const modalElem = $element.find('.modal')[0];
        const sliderInstance = M.Slider.getInstance(sliderElem);
        modalInstance = M.Modal.getInstance(modalElem);
        modalInstance.open();
        sliderInstance.pause();
        console.log('open', $element.find('.modal')[0]);
      };
      ctrl.movie.closeModal = () => {
        modalInstance.close();
        modalInstance.destroy();
      };

      this.sendMovie = (movie) => {
        console.log(movie);
        // this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
