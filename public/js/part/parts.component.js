(function() {
  'use strict'

  angular.module('app')
    .component('partsList', {
      controller: controller,
      templateUrl: '/js/part/parts-list.html'
    })

  controller.$inject = ['$state', '$http', '__env', 'partsService', 'authService']
  function controller($state, $http, __env, partsService, authService) {
    const vm = this

    vm.$onInit = function () {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      partsService.getParts().then((parts) => {
        vm.parts = parts;
      });
    }
  }

}());
