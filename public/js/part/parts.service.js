(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('partsService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    this.getParts = getParts;
    this.createPart = createPart;

    function getParts() {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/users`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data.parts);
    }

    function createPart(part) {
      console.log(part);
      const options = {
        method: 'POST',
        url: `${__env.apiUrl}/api/parts`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
        data: part,
      };
      return $http(options).then((response) => {
        console.log(response);
        return response.data.parts;
      });
    }
  }
}());
