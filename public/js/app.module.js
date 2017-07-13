(function() {
  'use strict';

  var env = {};

  // Import variables if present (from env.js)
  if(window){  
    Object.assign(env, window.__env);
  }

  // Define AngularJS application
  angular.module('app', ['ui.router'])
  .constant('__env', env);

}());
