(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('dashboard', {
      controller,
      templateUrl: '/js/part/dashboard.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'partsService', 'authService'];
  function controller($state, $http, __env, partsService, authService) {
    const vm = this;
    const userId = window.localStorage.getItem(__env.authUserIdKey);
    vm.$onInit = () => {
      const token = authService.checkCredentials();
      if (token === false) {
        $state.go('login');
      }
      partsService.getPartsForUser(userId).then((parts) => {
        vm.parts = parts;
      });
    };
  }
}());
