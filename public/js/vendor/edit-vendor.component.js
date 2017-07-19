(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('editVendor', {
      controller,
      templateUrl: '/js/vendor/edit-vendor.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'vendorService', 'authService', 'utilsService'];
  function controller($state, $stateParams, $http, __env,
    vendorService, authService, utilsService) {
    const vm = this;
    const vendorId = $stateParams.vendorId; // vendorId path parameter

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      vendorService.getVendor(vendorId).then((vendor) => {
        vm.vendor = vendor;
        vm.vendor.printers = utilsService.sortObjects(vm.vendor.printers, 'name');
        vm.vendor.printers = utilsService.sortObjects(vm.vendor.printers, 'manufacturer');
        return vendor;
      })
      .then((vendor) => {
        vendorService.getPrinters().then((printers) => {
          let newPrinters = [];
          const existingPrinterIds = [];
          if (vendor.printers !== null) {
            vendor.printers.forEach((printer) => {
              existingPrinterIds.push(printer.id);
            });
          } else {
            newPrinters = printers;
          }
          printers.forEach((printer) => {
            if (!existingPrinterIds.includes(printer.id)) {
              newPrinters.push(printer);
            }
          });
          vm.printers = utilsService.sortObjects(newPrinters, 'name');
          if (vm.printers.length > 0) {
            vm.printerId = vm.printers[0].id;
          }
        });
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
        vm.vendor.printers = utilsService.sortObjects(vm.vendor.printers, 'name');
        vm.vendor.printers = utilsService.sortObjects(vm.vendor.printers, 'manufacturer');
        vm.printers = vm.printers.filter(printer => printer.id !== vm.printerId);
        if (vm.printers.length > 0) {
          vm.printerId = vm.printers[0].id;
        }
      });
    };

    vm.removePrinter = (printerId) => {
      const removedPrinter = vm.vendor.printers.filter(printer => printer.id === printerId)[0];
      vendorService.removePrinterFromVendor(vendorId, printerId).then((result) => {
        vm.vendor.printers = result.printers;
        vm.printers.push(removedPrinter);
        if (vm.printers.length > 0) {
          vm.printers = utilsService.sortObjects(vm.printers, 'name');
          vm.printerId = vm.printers[0].id;
        }
      });
    };
  }
}());
