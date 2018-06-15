angular.module('movie-shelf')
  .component('shelfEntry', {
    bindings: {
      movie: '<',
      spliceit: '<',
      user: '<',
    },
    controller(server) {
      console.log(this.user);
      this.comments = [];
      this.box = false;


      this.showBox = () => {
        this.box = !this.box;
        console.log('hello box!');
      };

      this.leaveComment = (comment) => {
        console.log(comment);
        if (!comment) return;
        this.comments.unshift(`-${  comment}`);
        // server.add
      };

      this.reMovie = (movie) => {
        this.spliceit(movie);
      };
    },
    templateUrl: '/templates/shelfEntry.html',
  });
