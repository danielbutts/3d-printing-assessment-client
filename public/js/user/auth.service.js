(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('authService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    // let authToken;

    this.checkCredentials = checkCredentials;
    this.authenticate = authenticate;
    // this.loadUserCredentials = loadUserCredentials;
    // this.storeUserCredentials = storeUserCredentials;
    // this.useCredentials = useCredentials;
    this.destroyUserCredentials = destroyUserCredentials;

    function authenticate(login) {
      console.log('authenticate');
      return $http.post(`${__env.apiUrl}/api/login`, login).then((response) => {
        const token = response.data.token;
        console.log('response.data.token', token);
        window.localStorage.setItem(__env.authTokenKey, token);
        $http.defaults.headers.common.Authorization = token;
        return response.data;
      });
    }

    // function loadUserCredentials() {
    //   console.log('loadUserCredentials');
    //   const token = window.localStorage.getItem(__env.authTokenKey);
    //   if (token) {
    //     useCredentials(token);
    //   }
    // }

    function checkCredentials() {
      console.log('checkCredentials');
      const token = window.localStorage.getItem(__env.authTokenKey);
      if (token) {
        return true;
      }
      return false;
    }

    function destroyUserCredentials() {
      // authToken = undefined;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(__env.authTokenKey);
    }

    // function register(user) {
      // return $q(function(resolve, reject) {
      //   $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
      //     if (result.data.success) {
      //       resolve(result.data.msg);
      //     } else {
      //       reject(result.data.msg);
      //     }
      //   });
      // });
    // };

    function logout() { // eslint-disable-line no-unused-vars
      destroyUserCredentials();
    }

    // loadUserCredentials();
  }
}());
