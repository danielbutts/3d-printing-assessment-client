(function() {
  'use strict';
  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
    .state({
      name: 'home',
      url: '/',
      component: 'splashPage'
    })
    .state({
      name: 'dashboard',
      url: '/dashboard',
      component: 'partsList'
    })
    .state({
      name: 'login',
      url: '/login',
      component: 'loginPage'
    })
  }

}());
