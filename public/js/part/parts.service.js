(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('partsService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    this.getMaterials = getMaterials;
    this.getPartsForUser = getPartsForUser;
    this.getPart = getPart;
    this.createPart = createPart;

    function getMaterials() {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/materials/`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function getPartsForUser(userId) {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/users/${userId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data.parts);
    }

    function getPart(partId) {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/parts/${partId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
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
