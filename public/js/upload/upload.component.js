(function () {
  'use strict';

  /* global angular, $ */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('upload', {
      controller,
      templateUrl: '/js/upload/upload.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'uploadService', 'authService', 'FileUploader'];
  function controller($state, $http, __env, uploadService, authService, FileUploader) {
    const vm = this;
    vm.uploader = new FileUploader({
      url: `${__env.apiUrl}/api/upload`,
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
      name: 'pngFilter',
      fn: (item) => {
        const nameParts = item.name.split('.');
        if (nameParts.length > 0) {
          const extension = nameParts[nameParts.length - 1];
          return (extension.toLowerCase() === 'png');
        }
        return false;
      },
    });

    vm.uploader.filters.push({
      name: 'fileSizeFilter',
      fn: item => item.size < 25600,
    });

    vm.uploader.onWhenAddingFileFailed = (item, filter) => {
      if (filter.name === 'pngFilter') {
        vm.message = 'Invalid file extension. Please select a .PNG file';
      } else if (filter.name === 'fileSizeFilter') {
        vm.message = 'File too large. Please select a file smaller than 25 KB.';
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
