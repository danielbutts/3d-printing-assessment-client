(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('dashboard', {
      controller,
      templateUrl: '/js/part/dashboard.template.html',
    });

  controller.$inject = ['$state', '$http', '__env', 'partsService', 'authService', 'utilsService'];
  function controller($state, $http, __env, partsService, authService, utilsService) {
    const vm = this;
    const userId = window.localStorage.getItem(__env.authUserIdKey);
    vm.$onInit = () =>
      authService.checkCredentials().then((authResult) => {
        const token = authResult.token;
        if (token === false) {
          $state.go('login');
        }
        return partsService.getPartsForUser(userId).then((parts) => {
          const priceQueries = [];
          parts.forEach((part) => {
            priceQueries.push(partsService.getPrintingPricesForPart(part.id));
          });
          return Promise.all(priceQueries).then((priceResults) => {
            for (let p = 0; p < priceQueries.length; p += 1) {
              const part = parts[p];
              const printingOptions = priceResults[p];

              const rangeMax = parts[p].orderSize * 2;
              let minPrice;
              let total = 0;
              let count = 0;

              for (let i = 0; i < printingOptions.length; i += 1) {
                if (count > rangeMax) {
                  break;
                }
                for (let j = 0; j < printingOptions[i].printQuantity; j += 1) {
                  if (count > rangeMax) {
                    break;
                  }
                  total += printingOptions[i].prices[j];
                  count += 1;
                  const unitPrice = (total) / (count);
                  if (minPrice === undefined || unitPrice < minPrice) {
                    minPrice = unitPrice;
                    // console.log('minPrice', minPrice);
                  }
                }
              }
              if (part.price !== undefined && minPrice !== undefined) {
                part.score = (part.price / minPrice) * 100;
                switch (true) {
                  case part.score < 25:
                    part.scoreBackground = 'red';
                    break;
                  case part.score < 50:
                    part.scoreBackground = 'orange';
                    break;
                  case part.score < 75:
                    part.scoreBackground = 'yellow';
                    break;
                  default:
                    part.scoreBackground = 'green';
                }
              }
            }
            utilsService.sortObjects(parts, 'score', true);
            vm.parts = parts;
            return vm.parts;
          });
        });
      });

    vm.viewRow = (partId) => {
      $state.go('part-detail', { partId });
    };

    vm.editRow = (partId) => {
      $state.go('edit-part', { partId });
    };
  }
}());
