angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      userid: '<',
      movie: '<',
      pushit: '<',
    },
<<<<<<< HEAD
    controller: function controller(server) {
      this.sendMovie = (movie) => {
        console.log(this.userid, 'user');
        console.log(movie, 'movie');
        const userid = this.userid._id;
        const movieid = movie.id;
        this.pushit(movie);
        server.addReview(userid, movieid)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
=======
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
>>>>>>> 17346086c22c16ab36ef2aba1530905ede4aa549
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
