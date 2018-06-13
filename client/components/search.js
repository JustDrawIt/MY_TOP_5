angular.module('movie-shelf')

  .component('search', {
    bindings: {
      result: '<',
    },
    controller: function controller(itunes, TheMovieDB) {
      this.onClick = (query) => {
        itunes.search(query, this.result);
        TheMovieDB.search(query)
          .then((result) => {
            const { results } = result;
            TheMovieDB.searchVideos(results[0].id)
              .then((videos) => {
                console.log(videos, 'VIDEOs');
              })
              .catch((err) => { console.log(err); });
            TheMovieDB.searchCast(results[0].id)
              .then((credits) => {
                console.log(credits, 'Credits');
              })
              .catch((err) => { console.log(err); });
          })
          .catch((err) => { console.log(err); });
      };
    },
    templateUrl: 'templates/search.html',
  });
