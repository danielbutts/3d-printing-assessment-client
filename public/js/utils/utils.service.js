(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-unused-vars: "off",
  no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .service('utilsService', service);

  // service.$inject = [];
  function service() {
    this.sortObjects = sortObjects;

    function sortObjects(array, field, desc) {
      const sortedArray = array.sort((a, b) => {
        if (a[field] === null || a[field] === undefined) return true;
        if (b[field] === null || b[field] === undefined) return false;
        if (desc) {
          return (a[field] < b[field]);
        }
        return (a[field] > b[field]);
      });
      return sortedArray;
    }
  }
}());
