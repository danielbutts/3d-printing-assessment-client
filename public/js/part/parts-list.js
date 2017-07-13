(function() {
  'use strict'

  angular.module('app')
    .component('partsList', {
      controller: controller,
      templateUrl: '/js/part/parts-list.html'
    })

  controller.$inject = ['$http','__env']
  function controller($http, __env) {
    const vm = this

    vm.$onInit = function () {
      $http.get(`${__env.apiUrl}/parts`).then((response) => {
        console.log(response);
        vm.parts = response.data
      })
    }
  }

}());
