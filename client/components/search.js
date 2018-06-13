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
            TheMovieDB.getDetailsFromIDs(results);
          })
          .catch((err) => { console.log(err); });
      };
    },
    templateUrl: 'templates/search.html',
  });
