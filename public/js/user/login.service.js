(function() {
  'use strict'

  angular.module('app')
    .service('loginService', service)

  service.$inject = ['$http','__env']
  function service($http, __env) {
    const LOCAL_TOKEN_KEY = 'partridge-auth-token';
    let isAuthenticated = false;
    let authToken;

    this.authenticate = authenticate
    this.authenticate = authenticate
    

    function authenticate(login) {
      return $http.post(`${__env.apiUrl}/api/login`, login).then((response) => {
        storeUserCredentials(response.data.token);
        return response.data;
      })
    }
    
    function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var register = function(user) {
    // return $q(function(resolve, reject) {
    //   $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
    //     if (result.data.success) {
    //       resolve(result.data.msg);
    //     } else {
    //       reject(result.data.msg);
    //     }
    //   });
    // });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();
 
  }

}());
