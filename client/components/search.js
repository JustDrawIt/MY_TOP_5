angular.module('movie-shelf')

  .component('search', {
    bindings: {
      result: '<',
      getDetails: '<',
    },
    controller: function controller(TheMovieDB) {
      this.onClick = (query) => {
        const ctrl = this;
        TheMovieDB.search(query)
          .then(data => ctrl.getDetails(data))
          .catch((err) => { console.log(err); });
      };
    },
    templateUrl: 'templates/search.html',
  });
