(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('authService', service);

  service.$inject = ['$http', '__env'];
  function service($http, __env) {
    this.checkCredentials = checkCredentials;
    this.authenticate = authenticate;
    this.logout = logout;

    function authenticate(login) {
      return $http.post('/api/auth', login).then((response) => {
        const token = response.data.token;
        const userId = response.data.userId;
        const username = response.data.username;
        const isAdmin = response.data.isAdmin;
        window.localStorage.setItem(__env.authTokenKey, token);
        window.localStorage.setItem(__env.authUserIdKey, userId);
        window.localStorage.setItem(__env.authUsernameKey, username);
        window.localStorage.setItem(__env.authAdminKey, isAdmin);
        $http.defaults.headers.common.Authorization = token;
        return response.data;
      });
    }

    function checkCredentials() {
      const token = window.localStorage.getItem(__env.authTokenKey);
      $http.defaults.headers.common.Authorization = token;
      if (token !== undefined && token !== null) {
        return $http.get('/api/auth/validate', token).then(response => response.data);
      }
      return Promise.reject('not authenticated');
    }

    function logout() { // eslint-disable-line no-unused-vars
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(__env.authTokenKey);
      window.localStorage.removeItem(__env.authUsernameKey);
      window.localStorage.removeItem(__env.authUserIdKey);
      window.localStorage.removeItem(__env.authAdminKey);
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
  }
}());
