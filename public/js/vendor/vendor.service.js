(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('vendorService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    this.getVendors = getVendors;
    this.getVendor = getVendor;
    this.updateVendor = updateVendor;

    function getVendor(vendorId) {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/vendors/${vendorId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function getVendors() {
      const options = {
        method: 'GET',
        url: `${__env.apiUrl}/api/vendors/`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function updateVendor(vendor) {
      const options = {
        method: 'PATCH',
        url: `${__env.apiUrl}/api/vendors`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
        data: vendor,
      };
      return $http(options).then(response => response.data);
    }
  }
}());
