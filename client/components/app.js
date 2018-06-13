angular.module('movie-shelf')
  .component('app', {
    controller: function controller(server, TheMovieDB) {
      this.movies = [];
      this.shelf = [];

      this.searchResults = (data) => {
        this.movies = data.results;
        console.log('UPDATED MOVIES', this.movies);
      };

      this.getDetailsFromIDs = movies => new Promise((resolve, reject) => {
        console.log('IN RESULTS');
        let moviesDetails = [];
        movies.forEach((movie) => {
          const { id, title } = movie;
          let movieDetails = {};
          movieDetails.id = id;
          movieDetails.title = title;
          TheMovieDB.searchVideos(id)
            .then((videos) => {
              // console.log(videos, 'VIDEOs');
              movieDetails.videos = videos;
            })
            .catch((err) => { console.log(err); });
          TheMovieDB.searchCast(movies[0].id)
            .then((credits) => {
              movieDetails.credits = credits;
              // console.log(credits, 'Credits');
            })
            .catch((err) => { console.log(err); });
          moviesDetails.push(movieDetails);
        });
        console.log(moviesDetails, 'MOVIES DETAILS');
      });

      this.pushit = (movie) => {
        this.shelf.unshift(movie);
        console.log('added to shelf', movie);
      };

      this.spliceit = (movie) => {
        let i = this.shelf.indexOf(movie);
        this.shelf.splice(i, 1);
      };
      // this.pushit = this.pushit.bind(this);
      // server.getShelf((myMovies) => {
      //   this.shelf = myMovies;
      //   console.log('filled your shelf with ', this.shelf);
      // });
    },

    templateUrl: '/templates/app.html',

  });
