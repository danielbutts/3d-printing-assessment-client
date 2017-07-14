(function() {
  'use strict'

  angular.module('app')
    .component('loginForm', {
      bindings: {
        login: '<',
        authenticate: '&',
      },
      controller: controller,
      templateUrl: '/js/user/login-form.template.html'
    })

  controller.$inject = ['$state','authService']
  function controller($state, authService) {
    const vm = this
    
    vm.submit = function () {
      authService.authenticate({ login: vm.login }).then((response)=> {
        $state.go('dashboard');
      }).catch((err) => {
        $state.go('login', { message: 'Authentication Failed'});
      })
    }
  }
}());
