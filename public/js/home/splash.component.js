(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('splashPage', {
      controller,
      templateUrl: '/js/home/splash.template.html',
    });

  // controller.$inject = ['$http','__env']
  function controller() {
    const vm = this;

    vm.$onInit = () => {
    };
  }
}());
