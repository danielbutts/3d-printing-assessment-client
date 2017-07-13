(function() {
  'use strict'

  angular.module('app')
    .component('loginPage', {
      controller: controller,
      templateUrl: '/js/user/login.html'
    })

  controller.$inject = ['$http','__env']
  function controller($http, __env) {
    const vm = this

    vm.$onInit = function () {
    }
    
    vm.$onSubmit = function () {
      $http.post(`${__env.apiUrl}/users`).then((response) => {
        console.log(response);
        vm.parts = response.data
      })
    }
  }

  
}());
