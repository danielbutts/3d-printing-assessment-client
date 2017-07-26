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
      authService.checkCredentials().then((result) => {
        const token = result.token;
        if (token === false) {
          $state.go('login');
        }
        partsService.getPartsForUser(userId).then((parts) => {
          vm.parts = parts;
        });
      });
    };

    vm.viewRow = (partId) => {
      $state.go('part-detail', { partId });
    };

    vm.editRow = (partId) => {
      $state.go('edit-part', { partId });
    };
  }
}());
