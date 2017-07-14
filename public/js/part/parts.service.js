(function() {
  'use strict'

  angular.module('app')
    .service('partsService', service)

  service.$inject = ['$http','__env']
  function service($http, __env) {

    this.getParts = getParts;
    
    function getParts() {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/users`,
        headers: {
          'authorization': window.localStorage.getItem(__env.authTokenKey)
        },
      }
      return $http(options).then((response) => {
        return response.data.parts
      })
    }
  }

}());
