(function () {
  'use strict';

  /* global angular, window */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('partDetail', {
      controller,
      templateUrl: '/js/part/part-detail.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'partsService', 'vendorService', 'authService'];
  function controller($state, $stateParams, $http, __env, partsService,
    vendorService, authService) {
    const vm = this;
    const partId = $stateParams.partId; // partId path parameter

    vm.$onInit = () => {
      const isAdmin = window.localStorage.getItem(__env.authAdminKey);
      vm.isAdmin = (isAdmin === 'true');

      vm.chart = [];
      if (authService.checkCredentials() === false) {
        $state.go('login');
      }
      partsService.getPart(partId).then((part) => {
        if (part.material !== null) {
          part.materialId = part.material.id;
        }
        vm.part = part;
        return part;
      }).then((part) => {
        partsService.getPrintingPricesForPart(part.id).then((printingOptions) => {
          // const modulus = Math.round(printingOptions.length / 20);
          // TODO - limit graphed data points to 20;
          vm.printingOptions = printingOptions;

          const data = [];
          const labels = [];
          const current = [];
          const target = [];
          let total = 0;

          const rangeMax = part.orderSize * 2;
          let minPrice;
          let optimalQty;
          for (let i = 0; i < printingOptions.length; i += 1) {
            if (data.length > rangeMax) {
              break;
            }
            for (let j = 0; j < printingOptions[i].printQuantity; j += 1) {
              if (data.length > rangeMax) {
                break;
              }
              total += printingOptions[i].prices[j];

              labels.push(data.length + 1);
              current.push(part.price);
              const unitPrice = (total) / (data.length + 1);
              data.push(unitPrice);
              if (minPrice === undefined || unitPrice < minPrice) {
                minPrice = unitPrice;
                optimalQty = data.length;
              }

              if (data.length === printingOptions[i].part.orderSize) {
                // TODO get max height of graph and replace hardcoded value.
                target.push(3000);
              } else {
                target.push(0);
              }
            }
          }
          if (part.price !== undefined && minPrice !== undefined) {
            vm.score = (part.price / minPrice) * 100;
            switch (true) {
              case vm.score < 25:
                vm.scoreBackground = 'red';
                break;
              case vm.score < 50:
                vm.scoreBackground = 'orange';
                break;
              case vm.score < 75:
                vm.scoreBackground = 'yellow';
                break;
              default:
                vm.scoreBackground = 'green';
            }
            vm.minPrice = minPrice;
            vm.optimalQty = optimalQty;
          }
          if (data.length === 0) {
            vm.validGraph = false;
            vm.message = 'No printing options are available for this part.';
          } else {
            vm.validGraph = true;
          }

          vm.minPrice = minPrice;
          vm.labels = labels;
          vm.data = [current, data, target];
          vm.datasetOverride = [
            {
              fill: 'none',
              label: ' Current Cost',
              borderWidth: 4,
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderDash: [10, 5],
              type: 'line',
              pointRadius: 0,
            }, {
              label: ' Estimated Price',
              borderWidth: 3,
              backgroundColor: 'rgba(112,207,244,.25)',
              borderColor: 'rgba(112,207,244,1)',
              pointBorderColor: 'rgba(112,207,244,1)',
              type: 'line',
            }, {
              label: 'Target',
              borderWidth: 5,
              borderDash: [20, 3],
              backgroundColor: 'rgba(118,197,99,0)',
              borderColor: 'rgba(118,197,99,1)',
              type: 'bar',
            }];

          vm.options = {
            scales: {
              xAxes: [{
                barPercentage: 0.1,
                scaleLabel: {
                  display: true,
                  labelString: 'Quantity',
                },
                ticks: {
                  max: data.length,
                  min: -1,
                  stepSize: 10,
                  maxTicksLimit: 10,
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Estimated Unit Cost ($)',
                },
              }],
            },
            tooltips: {
              custom: (tooltipModel) => {
                if (tooltipModel.body && tooltipModel.body[2]) {
                  tooltipModel.body.splice(2, 1);
                  // tooltipModel.body[2].lines[0] = ` Target Quantity ${part.orderSize}`;
                  tooltipModel.title = '';
                  tooltipModel.height = 38;
                }
              },
            },
          };
        });
      });
    };
  }
}());
