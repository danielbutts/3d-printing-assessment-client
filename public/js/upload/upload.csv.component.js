(function () {
  'use strict';

  /* global angular, window, $ */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('csvUpload', {
      controller,
      templateUrl: '/js/upload/upload.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'authService', 'FileUploader'];
  function controller($state, $http, __env, authService, FileUploader) {
    const vm = this;
    vm.header = 'Upload a .CSV file';
    vm.uploader = new FileUploader({
      url: '/api/upload',
      headers: {
        authorization: window.localStorage.getItem(__env.authTokenKey),
      },
    });

    vm.$onInit = () => {
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
    };

    vm.submit = () => {
      vm.uploader.uploadAll();
    };

    vm.uploader.filters.push({
      name: 'csvFilter',
      fn: (item) => {
        const nameParts = item.name.split('.');
        if (nameParts.length > 0) {
          const extension = nameParts[nameParts.length - 1];
          return (extension.toLowerCase() === 'csv');
        }
        return false;
      },
    });

    vm.uploader.filters.push({
      name: 'fileSizeFilter',
      fn: item => item.size < 2048000,
    });

    vm.uploader.onWhenAddingFileFailed = (item, filter) => {
      if (filter.name === 'csvFilter') {
        vm.message = 'Invalid file extension. Please select a .CSV file';
      } else if (filter.name === 'fileSizeFilter') {
        vm.message = 'File too large. Please select a file smaller than 2 MB.';
      } else {
        vm.message = 'Something went wrong...';
      }
      $('#message').removeClass('hidden');
      $('#fileUploadField').val('');
    };

    vm.uploader.onAfterAddingFile = (fileItem) => {
      $('#message').addClass('hidden');
      console.info('onAfterAddingFile', fileItem);
    };

    vm.uploader.onErrorItem = (fileItem, response, status, headers) => {
      console.info('File failed to upload', fileItem, response, status, headers);
      $state.go('dashboard', { message: 'File failed to upload' });
    };

    vm.uploader.onCompleteAll = () => {
      console.info('File sucessfully uploaded');
      $state.go('dashboard', { message: 'File sucessfully uploaded' });
    };
  }
}());
