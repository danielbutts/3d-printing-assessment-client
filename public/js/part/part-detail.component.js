(function () {
  'use strict';

  /* global angular */
  /* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
  angular.module('app')
    .component('partDetail', {
      controller,
      templateUrl: '/js/part/part-detail.template.html',
    });

  controller.$inject = ['$state', '$stateParams', '$http', '__env', 'partsService', 'vendorService', 'authService', 'utilsService'];
  function controller($state, $stateParams, $http, __env, partsService,
    vendorService, authService, utilsService) {
    const vm = this;
    const partId = $stateParams.partId; // partId path parameter

    vm.$onInit = () => {
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
        vendorService.getPrintingOptionsForPart(part.id).then((options) => {
          options.forEach((option) => {
            option.cost = part.volume *
            part.basePriceMultiplier * part.materialMultiplier *
            option.processMultiplier * option.vendorMargin;
          });
          utilsService.sortObjects(options, 'cost');
          vm.options = options;
          return options;
        })
        .then((options) => {
          const data = [];
          const labels = [];
          const current = [];
          const target = [];
          let total = 0;

          const rangeMax = part.orderSize * 2;
          for (let i = 0; i < options.length; i += 1) {
            if (data.length > rangeMax) {
              break;
            }
            for (let j = 0; j < options[i].maxOrder; j += 1) {
              if (data.length > rangeMax) {
                break;
              }
              total += options[i].cost;

              labels.push(data.length + 1);
              current.push(part.price);
              data.push((total) / (data.length + 1));
              if (data.length === part.orderSize) {
                // TODO get max height of graph and replace hardcoded value.
                target.push(1200);
              } else {
                target.push(0);
              }
            }
          }

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

          // console.log(data);
        });
      });
    };
  }
}());
