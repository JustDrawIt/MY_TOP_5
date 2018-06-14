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
        console.log($element.find('.modal'));
        $('.modal').modal();
        const modalElem = $element.find('.modal')[0];
        let modalInstance;
        if (modalElem) {
          modalInstance = M.Modal.getInstance(modalElem);
        }
        if (this.movie.hasMedia) {
          if (modalInstance) {
            ctrl.movie.openModal = () => {
              console.log('OPEN');
              modalInstance.open();
            };
            ctrl.movie.closeModal = () => {
              console.log('CLOSE');
              modalInstance.close();
            };
          }
        }
        $('.slider').slider();
        const sliderElem = $element.find('.slider')[0];
        if (modalElem) {
          const sliderInstance = M.Slider.getInstance(sliderElem);
          sliderInstance.pause();
        }
      };
      setTimeout(getInstances, 750);
      // });
      this.sendMovie = (movie) => {
        console.log(movie);
        // this.pushit(movie);
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
