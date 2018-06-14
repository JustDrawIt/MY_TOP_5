angular.module('movie-shelf')
  .component('login', {
    controller: (checkAuth) => {
      this.onClick = () => {
        checkAuth.check();
      };
      console.log(checkAuth);
    },

    templateURL: '/templates/login.html',
  });
