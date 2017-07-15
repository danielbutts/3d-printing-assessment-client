(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('dashboard', {
      controller,
      templateUrl: '/js/part/dashboard.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'partsService', 'authService'];
  function controller($state, $http, __env, partsService, authService) {
    const vm = this;

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      partsService.getParts().then((parts) => {
        vm.parts = parts;
      });
    };
  }
}());
