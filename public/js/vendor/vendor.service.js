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
    this.getPrinters = getPrinters;
    this.addPrinterToVendor = addPrinterToVendor;
    this.removePrinterFromVendor = removePrinterFromVendor;
    this.getPrintingOptionsForPart = getPrintingOptionsForPart;

    function getVendor(vendorId) {
      const options = {
        method: 'GET',
        url: `/api/vendors/${vendorId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function getVendors() {
      const options = {
        method: 'GET',
        url: `/api/vendors/`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function getPrintingOptionsForPart(partId) {
      const options = {
        method: 'GET',
        url: `/api/vendors/part/${partId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function updateVendor(vendor) {
      const options = {
        method: 'PATCH',
        url: `/api/vendors`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
        data: vendor,
      };
      return $http(options).then(response => response.data);
    }

    function getPrinters() {
      const options = {
        method: 'GET',
        url: `/api/printers/`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function addPrinterToVendor(vendorId, printerId) {
      const options = {
        method: 'POST',
        url: `/api/vendors/${vendorId}/printer/${printerId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }

    function removePrinterFromVendor(vendorId, printerId) {
      const options = {
        method: 'DELETE',
        url: `/api/vendors/${vendorId}/printer/${printerId}`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
      };
      return $http(options).then(response => response.data);
    }
  }
}());
