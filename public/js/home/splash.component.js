(function() {
  'use strict'

  angular.module('app')
    .component('splashPage', {
      controller: controller,
      templateUrl: '/js/home/splash.template.html'
    })

  // controller.$inject = ['$http','__env']
  function controller() {
    const vm = this

    vm.$onInit = function () {
    }
  }

}());
