(() => { 'use strict';
  angular.module('angular-starter-app', [
    'ui.router'
  ]);

  function routesConfig($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app', {
      url: '/',
      views: {
        'content@': {
          templateUrl: 'components/home/home.html',
          controller: 'HomeController as homeVm'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  }

  // Config
  angular.module('angular-starter-app').config(routesConfig);
})();