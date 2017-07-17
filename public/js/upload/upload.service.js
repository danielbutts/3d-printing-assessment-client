(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('uploadService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    this.uploadFile = uploadFile;

    function uploadFile(file) {
      console.log('uploadFile in uploadService', file);
      const options = {
        method: 'POST',
        url: `${__env.apiUrl}/api/upload`,
        headers: {
          authorization: window.localStorage.getItem(__env.authTokenKey),
        },
        data: file,
      };
      return $http(options).then(response => response.data.parts);
    }
  }
}());
