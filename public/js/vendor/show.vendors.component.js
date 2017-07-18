(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('showVendors', {
      controller,
      templateUrl: '/js/vendor/show.vendors.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'vendorService', 'authService'];
  function controller($state, $http, __env, vendorService, authService) {
    const vm = this;
    vm.$onInit = () => {
      const token = authService.checkCredentials();
      if (token === false) {
        $state.go('login');
      }
      vendorService.getVendors().then((vendors) => {
        vm.vendors = vendors;
      });
    };
  }
}());
