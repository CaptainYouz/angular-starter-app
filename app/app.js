(() => { 'use strict';
  angular.module('skeleton-app', [
    // External modules
    'ui.router',
    // Components
    'skeleton-app.home'
  ]);

  function routesConfig ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('skeleton-app', {
      url: '/',
      abstract: true,
      views : {
        'header': { templateUrl: 'header/header.html' },
        'footer': { templateUrl: 'footer/footer.html' }
      }
    });

    $urlRouterProvider.otherwise('/home');
  }

  // Config
  angular.module('skeleton-app').config(routesConfig);
})();