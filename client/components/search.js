angular.module('movie-shelf')

  .component('search', {
    bindings: {
      result: '<',
      getDetails: '<',
    },
    controller: function controller(itunes, TheMovieDB) {
      this.onClick = (query) => {
        const ctrl = this;
        itunes.search(query, this.result);
        TheMovieDB.search(query)
          .then((result) => {
            const { results } = result;
            ctrl.getDetails(results);
          })
          .catch((err) => { console.log(err); });
      };
    },
    templateUrl: 'templates/search.html',
  });
