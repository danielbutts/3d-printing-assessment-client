(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('partDetail', {
      controller,
      templateUrl: '/js/part/part-detail.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'partsService', 'vendorService', 'authService', 'utilsService'];
  function controller($state, $stateParams, $http, __env, partsService,
    vendorService, authService, utilsService) {
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
        vendorService.getPrintingOptionsForPart(part.id).then((options) => {
          options.forEach((option) => {
            option.cost = part.volume *
            part.basePriceMultiplier * part.materialMultiplier *
            option.processMultiplier * option.vendorMargin;
          });
          utilsService.sortObjects(options, 'cost');
          vm.options = options;
        });
      });
    };
  }
}());
