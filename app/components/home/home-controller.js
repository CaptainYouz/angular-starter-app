(() => { 'use strict';
  function HomeController() {
    let vm = this;

    vm.welcomeMessage = 'Hello World!';
  }

  angular.module('angular-starter-app').controller('HomeController', HomeController);
})();