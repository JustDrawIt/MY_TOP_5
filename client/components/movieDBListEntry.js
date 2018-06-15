angular.module('movie-shelf')
  .component('movieEntry', {
    bindings: {
      userid: '<',
      movie: '<',
      pushit: '<',
    },
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
      };
    },
    templateUrl: '/templates/movieDBListEntry.html',
  });
