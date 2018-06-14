angular.module('movie-shelf')
  .component('login', {
    bindings: {
      authenticated: '<',
    },
    controller: function(checkAuth) {
      // this.onClick = () => {
      //   checkAuth.check();
      // };
      // console.log(checkAuth);
    },

    templateUrl: '/templates/login.html',
  });
