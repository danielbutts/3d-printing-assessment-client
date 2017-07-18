(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('editVendor', {
      controller,
      templateUrl: '/js/vendor/edit-vendor.template.html',
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
      vendorService.getPrinters().then((printers) => {
        vm.printers = printers;
        vm.printerId = printers[0].id;
      });
    };

    vm.submit = () => {
      vendorService.updateVendor(vm.vendor).then(() => {
        $state.go('show-vendors');
      });
    };

    vm.addPrinter = () => {
      vendorService.addPrinterToVendor(vendorId, vm.printerId).then((result) => {
        vm.vendor.printers = result.printers;
      });
    };

    vm.removePrinter = (printerId) => {
      vendorService.removePrinterFromVendor(vendorId, printerId).then((result) => {
        vm.vendor.printers = result.printers;
      });
    };
  }
}());
