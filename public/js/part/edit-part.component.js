(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('editPart', {
      controller,
      templateUrl: '/js/part/edit-part.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'partsService', 'authService'];
  function controller($state, $stateParams, $http, __env, partsService, authService) {
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
        partsService.getMaterials().then((materials) => {
          vm.materials = materials;
        });
      });
    };

    vm.submit = () => {
      partsService.updatePart(vm.part).then(() => {
        $state.go('part-detail', { partId: vm.part.id });
      });
    };
  }
}());
