(function() {
  'use strict'

  angular.module('app')
    .component('upload', {
      controller: controller,
      templateUrl: '/js/upload/upload.template.html'
    })

  controller.$inject = ['$state', '$http', '__env', 'uploadService', 'authService']
  function controller($state, $http, __env, uploadService, authService) {
    const vm = this

    vm.$onInit = function () {
    }
  }

}());
