(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('partDetail', {
      controller,
      templateUrl: '/js/part/part-detail.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'partsService', 'vendorService', 'authService'];
  function controller($state, $stateParams, $http, __env, partsService,
    vendorService, authService) {
    const vm = this;
    const partId = $stateParams.partId; // partId path parameter

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      partsService.getPart(partId).then((part) => {
        if (part.material !== null) {
          part.materialId = part.material.id;
        }
        vm.part = part;
        return part;
      }).then((part) => {
        vendorService.getVendors().then((vendors) => {
          const validVendors = [];
          vendors.forEach((vendor) => {
            const validPrinters = [];
            if (vendor.printers != null) {
              vendor.printers.forEach((printer) => {
                let isValidPrinter = true;
                const materialIds = printer.materials.map(material => material.id);
                if (!materialIds.includes(part.material.id)) {
                  // console.log('material');
                  isValidPrinter = false;
                }
                if (printer.maxWidth < part.width) {
                  // console.log('part.width');
                  isValidPrinter = false;
                }
                if (printer.maxDepth < part.depth) {
                  // console.log('part.depth');
                  isValidPrinter = false;
                }
                if (printer.maxHeight < part.height) {
                  // console.log('part.height');
                  isValidPrinter = false;
                }
                if (part.strengthCritical && printer.process !== 'DMLS') {
                  // console.log('part.strengthCritical', part.strengthCritical, printer.process);
                  isValidPrinter = false;
                }
                if (isValidPrinter) {
                  validPrinters.push(printer);
                }
              });
            }
            if (validPrinters.length > 0) {
              let isValidVendor = true;
              vendor.printers = validPrinters;
              if (vendor.maxOrder < part.minOrder) { isValidVendor = false; }
              if (vendor.turnaround > part.maxTurnaround) { isValidVendor = false; }

              if (isValidVendor) {
                validVendors.push(vendor);
              }
            }
          });
          vm.vendors = validVendors;
        });
      });
    };
  }
}());
