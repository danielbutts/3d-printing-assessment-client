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
            console.log(vendor.name);
            const validPrinters = [];
            if (vendor.printers != null) {
              vendor.printers.forEach((printer) => {
                console.log('printer: ', printer.name);
                let isValidPrinter = true;
                const materialIds = printer.materials.map(material => material.id);
                if (!materialIds.includes(part.material.id)) {
                  console.log('cannot print material');
                  isValidPrinter = false;
                }
                if (printer.maxWidth < part.width) {
                  console.log('insufficient width');
                  isValidPrinter = false;
                }
                if (printer.maxDepth < part.depth) {
                  console.log('insufficient depth');
                  isValidPrinter = false;
                }
                if (printer.maxHeight < part.height) {
                  console.log('insufficient height');
                  isValidPrinter = false;
                }
                if (isValidPrinter) {
                  console.log('valid printer');
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
                console.log('valid vendor');
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
