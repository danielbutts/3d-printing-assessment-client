(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('upload', {
      controller,
      templateUrl: '/js/upload/upload.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'uploadService', 'authService'];
  function controller($state, $http, __env, uploadService, authService) {
    const vm = this;

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
    };

    vm.submit = () => {
      console.log('submit in uploadComponent', vm.file);
      uploadService.uploadFile(vm.file).then(() => {
        $state.go('dashboard');
      });
    };
  }
}());
