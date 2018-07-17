angular.module('movie-shelf')
  .component('shelfEntry', {
    bindings: {
      movie: '<',
      spliceit: '<',
      userid: '<',
    },

    controller(server, $timeout) {
      this.comments = [];
      this.box = false;

      $timeout(() => {
        $('#reviews').modal();
      });

      server.getReviews(this.movie.id)
        .then(response => Promise.all(response.data.map(async (review) => {
          const usersResponse = await server.getUser(review.userId);
          review.user = usersResponse.data;
          return review;
        })))
        .then(reviews => this.comments.push(...reviews));

      this.showBox = () => {
        this.box = !this.box;
      };

      this.leaveComment = (comment) => {
        if (!comment) {
          return M.toast({ html: 'Please enter a review!' });
        }

        const movieId = this.movie.id;
        const userid = this.userid._id;

        server.addReview(comment, movieId, userid)
          .then((data) => {
            this.note = '';
            this.comments.unshift(data);
            M.toast({ html: 'Review created!' });
          })
          .catch(e => (e.data.error.includes('already reviewed')
            ? M.toast({ html: 'You may only review once!' })
            : M.toast({ html: 'Review couldn\'t be created!' })));
      };

      this.reMovie = (movie) => {
        const movieId = movie.id;
        const userId = this.userid._id;
        this.spliceit(movie);
        server.deleteMovie(movieId, userId)
          .then(() => M.toast({ html: 'Movie removed from your shelf' }))
          .catch(() => M.toast({ html: 'Movie couldn\'t be removed from your shelf' }));
      };
    },
    templateUrl: '/templates/shelfEntry.html',
  });
