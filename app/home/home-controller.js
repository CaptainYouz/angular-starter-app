/**
 * Home Controller
 * @namespace Controllers
 */

(function () { 'use strict';
	function HomeController () {
		var vm = this;

		vm.welcome = 'Hello World!';
	}

	angular.module('skeleton-app.home').controller('HomeController', HomeController);
})();
