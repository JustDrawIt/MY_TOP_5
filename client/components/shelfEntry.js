angular.module('movie-shelf')
  .component('shelfEntry', {
    bindings: {
      movie: '<',
      spliceit: '<',
      userid: '<',
    },
    controller(server) {
      this.comments = [];
      this.box = false;


      this.showBox = () => {
        this.box = !this.box;
      };

      this.leaveComment = (comment) => {
        if (!comment) return;
        this.comments.unshift(`-${comment}`);
        const movieId = this.movie.id;
        const userid = this.userid._id;

        server.addReview(comment, movieId, userid)
          .then((data) => {
          })
          .catch((err) => {
            console.error(err);
          });
      };

      this.reMovie = (movie) => {
        const movieId = movie.id;
        const userId = this.userid._id;
        this.spliceit(movie);
        server.deleteMovie(movieId, userId)
          .then((data) => {
          })
          .catch((err) => {
            console.error(err);
          });
      };
    },
    templateUrl: '/templates/shelfEntry.html',
  });
