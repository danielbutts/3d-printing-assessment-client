(function (window) {
  window.__env = window.__env || {};

  window.__env.authTokenKey = 'partridge-auth-token'
  window.__env.authUserIdKey = 'partridge-auth-userid'
  window.__env.authUsernameKey = 'partridge-auth-username'
  window.__env.authAdminKey = 'partridge-auth-admin'

  // Base url
  window.__env.baseUrl = '/';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));