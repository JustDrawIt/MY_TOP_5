angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      userid: '<',
      movie: '<',
      pushit: '<',
    },
    controller: function controller($element, server) {
      const ctrl = this;
      let modalInstance = null;
      ctrl.movie.openModal = () => {
        ctrl.showModal = true;
        setTimeout(() => {
          $('.modal').modal();
          $('.slider').slider();
          const sliderElem = $element.find('.slider')[0];
          const modalElem = $element.find('.modal')[0];
          const sliderInstance = M.Slider.getInstance(sliderElem);
          modalInstance = M.Modal.getInstance(modalElem);
          modalInstance.open();
          sliderInstance.pause();
        }, 0);
      };
      ctrl.movie.closeModal = () => {
        modalInstance.close();
        modalInstance.destroy();
        ctrl.showModal = false;
      };

      this.sendMovie = (movie) => {
        const movieId = movie.id;
        const userId = this.userid._id;
        this.pushit(movie);
        server.addFavorite(movieId, userId)
          .then(() => M.toast({ html: `"${movie.title}" was added to your shelf` }))
          .catch(() => M.toast({ html: `Oops, couldn't add "${movie.title}" to your shelf` }));
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
