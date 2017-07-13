(function() {
  'use strict'

  angular.module('app')
    .component('navbar', {
      controller: controller,
      templateUrl: '/js/nav/nav.template.html'
    })

  // controller.$inject = []
  function controller() {
    const vm = this

    vm.$onInit = function () {
    }
  }

}());
