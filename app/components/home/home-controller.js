(() => { 'use strict';
  function HomeController() {
    let vm = this;

    vm.welcomeMessage = 'Home';
  }

  angular.module('angular-starter-app').controller('HomeController', HomeController);
})();