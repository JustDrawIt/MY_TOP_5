angular.module('movie-shelf')
  .component('login', {
    bindings: {
      authenticated: '<',
    },
    controller: function controller(checkAuth) {
      const callback = (data) => {
        console.log(data);
        if (data) {
          this.authenticated = true;
        }
        console.log(this.authenticated);
        return this.authenticated;
      };
      this.onClick = () => {
        checkAuth.check(callback);
      };
    },

    templateUrl: '/templates/login.html',
  });
