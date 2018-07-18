angular.module('movie-shelf')
  .component('search', {
    bindings: {
      result: '<',
      getDetails: '<',
      toggleView: '<',
      toggleLoading: '<',
    },
    controller: function controller(TheMovieDB) {
      this.onClick = (query) => {
        const ctrl = this;
        ctrl.toggleView('searched');
        ctrl.toggleLoading('search');
        TheMovieDB.search(query)
          .then(data => ctrl.getDetails(data, 'moviesDB'))
          .catch(() => M.toast({ html: 'Oops! Something went wrong searching' }))
          .finally(() => ctrl.toggleLoading('search'));
      };
    },
    templateUrl: 'templates/search.html',
  });
