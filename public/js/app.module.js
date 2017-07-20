(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  const env = {};

  // Import variables if present (from env.js)
  if (window) {
    Object.assign(env, window.__env); // eslint-disable-line no-underscore-dangle
  }

  // Define AngularJS application
  angular.module('app', ['ui.router', 'angularFileUpload', 'chart.js'])
  .constant('__env', env);
}());
