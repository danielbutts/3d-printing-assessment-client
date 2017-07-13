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

  controller.$inject = ['loginService']
  function controller(loginService) {
    const vm = this
    
    vm.submit = function () {
      console.log('onSubmit');
      loginService.authenticate({ login: vm.login })
    }
  }
}());
