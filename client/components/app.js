angular.module('movie-shelf')
  .component('app', {
    controller: function controller(server, TheMovieDB) {
      this.movies = [];
      this.moviesDB = [];
      this.shelf = [];
      this.user = null;

      this.searchResults = (data) => {
        this.movies = data.results;
      };

      this.authenticated = false;

      this.changeAuth = (data) => {
        if (data.user) {
          this.user = data.user;
          this.authenticated = true;
          console.log(this.user, 'this.user');
          console.log(data.user, 'user data');
        }
        return this.authenticated;
      };


      this.getDetailsFromIDs = (movies) => {
        // reset moviesDB state;
        this.moviesDB = [];
        // push each movieDetail to moviesDB state
        movies.forEach((movie) => {
          const {
            id,
            title,
            overview,
            release_date,
            poster_path,
          } = movie;
          const movieDetails = {};
          movieDetails.id = id;
          movieDetails.title = title;
          movieDetails.overview = overview;
          movieDetails.releaseDate = release_date;
          if (poster_path) {
            movieDetails.posterUrl = `http://image.tmdb.org/t/p/w500${poster_path}`;
          }
          TheMovieDB.searchVideos(id)
            .then((videos) => {
              movieDetails.videos = videos;
            })
            .catch((err) => { console.log(err); });
          TheMovieDB.searchCast(id)
            .then((credits) => {
              const director = credits.crew.filter(member => member.job === 'Director');
              movieDetails.credits = credits;
              movieDetails.director = director;
            })
            .catch((err) => { console.log(err); });
          this.moviesDB.push(movieDetails);
        });
      };

      this.pushit = (movie) => {
        this.shelf.unshift(movie);
      };

      this.spliceit = (movie) => {
        const i = this.shelf.indexOf(movie);
        this.shelf.splice(i, 1);
      };
    },

    templateUrl: '/templates/app.html',

  });
