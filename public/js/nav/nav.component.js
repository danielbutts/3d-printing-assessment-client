(function() {
  'use strict'

  angular.module('app')
    .component('navbar', {
      controller: controller,
      templateUrl: '/js/nav/nav.template.html'
    })

  controller.$inject = ['$state','authService']
  function controller($state, authService) {
    const vm = this

    vm.logout = function() {
      authService.destroyUserCredentials();
      $state.go('home');
    }
    
    vm.$onInit = function () {
      if (authService.checkCredentials()) {
        vm.isAuthenticated = true;
      } else {
        vm.isAuthenticated = false;        
      }
    }
  }

}());
