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
    this.updatePart = updatePart;
    this.getPrintingPricesForPart = getPrintingPricesForPart;

    function getMaterials() {
      const options = {
        method: 'GET',
        url: `/api/materials/`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function getPartsForUser(userId) {
      const options = {
        method: 'GET',
        url: `/api/users/${userId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data.parts);
    }

    function getPart(partId) {
      const options = {
        method: 'GET',
        url: `/api/parts/${partId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function getPrintingPricesForPart(partId) {
      const options = {
        method: 'GET',
        url: `/api/parts/${partId}/cost`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function createPart(part) {
      const options = {
        method: 'POST',
        url: `/api/parts`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
        data: part,
      };
      return $http(options).then(response => response.data.parts);
    }

    function updatePart(part) {
      const options = {
        method: 'PATCH',
        url: `/api/parts`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
        data: part,
      };
      return $http(options).then(response => response.data.parts);
    }
  }
}());
