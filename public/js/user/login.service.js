(function() {
  'use strict'

  angular.module('app')
    .service('loginService', service)

  service.$inject = ['$http','__env']
  function service($http, __env) {
    this.authenticate = authenticate

    function authenticate(login) {
      return $http.post(`${__env.apiUrl}/api/login`, login).then((response) => {
        return response.data;
        // window.localStorage.setItem(LOCAL_TOKEN_KEY, response.token);
        // vm.parts = response.data
      })
    }

  }

}());
