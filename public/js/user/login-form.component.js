(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('loginForm', {
      bindings: {
        login: '<',
        authenticate: '&',
      },
      controller,
      templateUrl: '/js/user/login-form.template.html',
    });

  controller.$inject = ['$state', 'authService'];
  function controller($state, authService) {
    const vm = this;

    vm.submit = () => {
      authService.authenticate({ login: vm.login }).then((response) => {
        $state.go('dashboard');
      }).catch((err) => {
        $state.go('login', { message: 'Authentication Failed', error: err });
      });
    };
  }
}());
