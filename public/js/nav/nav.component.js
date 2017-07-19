(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('navbar', {
      controller,
      templateUrl: '/js/nav/nav.template.html',
    });

  controller.$inject = ['$state', 'authService', '__env'];
  function controller($state, authService, __env) {
    const vm = this;
    vm.username = window.localStorage.getItem(__env.authUsernameKey);

    vm.logout = () => {
      authService.logout();
      $state.go('home');
      $state.reload();
    };

    vm.$onInit = () => {
      if (authService.checkCredentials()) {
        vm.isAuthenticated = true;
      } else {
        vm.isAuthenticated = false;
      }
    };
  }
}());
