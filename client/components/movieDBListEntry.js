angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      movie: '<',
      pushit: '<',
    },
    controller: function controller($element) {
      const ctrl = this;
      // angular.element(document).ready(() => {
      // $(document).ready(() => {
      const getInstances = () => {
        $('.modal').modal();
        const modalElem = $element.find('.modal')[0];
        let modalInstance;
        if (modalElem) {
          modalInstance = M.Modal.getInstance(modalElem);
        }
        if (modalInstance) {
          ctrl.movie.openModal = () => {
            modalInstance.open();
          };
          ctrl.movie.closeModal = () => {
            modalInstance.close();
            modalInstance.destroy();
          };
        }
        $('.slider').slider();
        const sliderElem = $element.find('.slider')[0];
        if (modalElem) {
          const sliderInstance = M.Slider.getInstance(sliderElem);
          sliderInstance.pause();
        }
      };
      setTimeout(getInstances, 700);
      // });
      this.sendMovie = (movie) => {
        console.log(movie);
        // this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
