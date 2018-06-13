angular.module('movie-shelf')
  .component('app', {
    controller: function controller(server, TheMovieDB) {
      this.movies = [];
      this.moviesDB = [];
      this.shelf = [];

      this.searchResults = (data) => {
        this.movies = data.results;
        console.log('UPDATED MOVIES', this.movies);
      };

      this.getDetailsFromIDs = (movies) => {
        movies.forEach((movie) => {
          console.log(movie);
          const {
            id,
            title,
            overview,
            release_date,
          } = movie;
          const movieDetails = {};
          movieDetails.id = id;
          movieDetails.title = title;
          movieDetails.overview = overview;
          movieDetails.releaseDate = release_date;
          TheMovieDB.searchVideos(id)
            .then((videos) => {
              // console.log(videos, 'VIDEOs');
              movieDetails.videos = videos;
            })
            .catch((err) => { console.log(err); });
          TheMovieDB.searchCast(movies[0].id)
            .then((credits) => {
              const director = credits.crew.filter(member => member.job === 'Director');
              movieDetails.credits = credits;
              movieDetails.director = director;
              // console.log(credits, 'Credits');
            })
            .catch((err) => { console.log(err); });
          this.moviesDB.push(movieDetails);
        });
        // this.moviesDB = moviesDetails;
        console.log(this.moviesDB, 'MOVIES DETAILS');
      };

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
