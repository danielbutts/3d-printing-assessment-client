(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('vendorService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    // this.getMaterials = getMaterials;
    // this.getPrinters = getPrinters;
    // this.getVendor = getVendor;
    this.getVendors = getVendors;

    // function getMaterials() {
    //   const options = {
    //     method: 'GET',
    //     url: `${__env.apiUrl}/api/materials/`,
    //     headers: {
    //       authorization: window.localStorage.getItem(__env.authTokenKey),
    //     },
    //   };
    //   return $http(options).then(response => response.data);
    // }

    // function getPrinters() {
    //   const options = {
    //     method: 'GET',
    //     url: `${__env.apiUrl}/api/printers/`,
    //     headers: {
    //       authorization: window.localStorage.getItem(__env.authTokenKey),
    //     },
    //   };
    //   return $http(options).then(response => response.data.printers);
    // }

    // function getVendor(vendorId) {
    //   const options = {
    //     method: 'GET',
    //     url: `${__env.apiUrl}/api/vendors/${vendorId}`,
    //     headers: {
    //       authorization: window.localStorage.getItem(__env.authTokenKey),
    //     },
    //   };
    //   return $http(options).then(response => response.data);
    // }

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
  }
}());
