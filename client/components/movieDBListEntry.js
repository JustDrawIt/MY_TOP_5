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
        $('.modal').modal();
        $('.slider').slider();
        const sliderElem = $element.find('.slider')[0];
        const modalElem = $element.find('.modal')[0];
        const sliderInstance = M.Slider.getInstance(sliderElem);
        modalInstance = M.Modal.getInstance(modalElem);
        modalInstance.open();
        sliderInstance.pause();
      };
      ctrl.movie.closeModal = () => {
        modalInstance.close();
        modalInstance.destroy();
      };

      this.sendMovie = (movie) => {
        console.log(movie);
        console.log(this.userid);
        const movieId = movie.id;
        console.log(this.userid._id);
        const userId = this.userid._id;
        this.pushit(movie);
        server.addFavorite(movieId, userId)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
