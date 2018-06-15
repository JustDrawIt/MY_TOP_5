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
        console.log('hello box!');
      };

      this.leaveComment = (comment) => {
        console.log(comment);
        if (!comment) return;
        this.comments.unshift(`-${comment}`);
        console.log(this.movie);
        const movieId = this.movie.id;
        const userid = this.userid._id;
        console.log(this.userid);

        server.addReview(comment, movieId, userid)
          .then((data) => {
            console.log(data, 'MEEEE');
          })
          .catch((err) => {
            console.error(err);
          });
      };

      this.reMovie = (movie) => {
        this.spliceit(movie);
      };
    },
    templateUrl: '/templates/shelfEntry.html',
  });
