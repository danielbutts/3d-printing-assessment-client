(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('showVendors', {
      controller,
      templateUrl: '/js/vendor/show.vendors.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'vendorService', 'authService', 'utilsService'];
  function controller($state, $http, __env,
    vendorService, authService, utilsService) {
    const vm = this;

    vm.$onInit = () => {
      const token = authService.checkCredentials();
      if (token === false) {
        $state.go('login');
      }
      vendorService.getVendors().then((vendors) => {
        utilsService.sortObjects(vendors, 'name');
        vm.vendors = vendors;
      });
    };

    vm.viewRow = (vendorId) => {
      $state.go('vendor-detail', { vendorId });
    };

    vm.editRow = (vendorId) => {
      $state.go('edit-vendor', { vendorId });
    };
  }
}());
