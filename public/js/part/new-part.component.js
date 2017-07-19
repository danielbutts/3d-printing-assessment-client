(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('newPart', {
      controller,
      templateUrl: '/js/part/new-part.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'partsService', 'authService'];
  function controller($state, $http, __env, partsService, authService) {
    const vm = this;

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      partsService.getMaterials().then((materials) => {
        vm.materials = materials;
      });
    };

    vm.submit = () => {
      partsService.createPart(vm.part).then(() => {
        $state.go('dashboard');
      });
    };
  }
}());
