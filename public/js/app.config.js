(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app').config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
    .state({
      name: 'home',
      url: '/',
      component: 'splashPage',
    })
    .state({
      name: 'dashboard',
      url: '/dashboard',
      component: 'dashboard',
    })
    .state({
      name: 'new-part',
      url: '/new-part',
      component: 'newPart',
    })
    .state({
      name: 'edit-part',
      url: '/edit-part/:partId',
      component: 'editPart',
    })
    .state({
      name: 'login',
      url: '/login',
      component: 'loginForm',
    })
    .state({
      name: 'csv-upload',
      url: '/csv-upload',
      component: 'csvUpload',
    })
    .state({
      name: 'stl-upload',
      url: '/stl-upload',
      component: 'stlUpload',
    })
    .state({
      name: 'show-vendors',
      url: '/vendors',
      component: 'showVendors',
    });
  }
}());
