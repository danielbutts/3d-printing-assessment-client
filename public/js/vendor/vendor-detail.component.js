(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('vendorDetail', {
      controller,
      templateUrl: '/js/vendor/vendor-detail.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'vendorService', 'authService'];
  function controller($state, $stateParams, $http, __env, vendorService, authService) {
    const vm = this;
    const vendorId = $stateParams.vendorId; // vendorId path parameter

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      vendorService.getVendor(vendorId).then((vendor) => {
        vm.vendor = vendor;
      });
    };

    vm.submit = () => {
      vendorService.updateVendor(vm.vendor).then(() => {
        $state.go('show-vendors');
      });
    };
  }
}());
