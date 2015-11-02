/**
 * Skeleton-app.home module
 * @namespace Modules
 * @desc Handle the home module of the app
 */

(function () { 'use strict';
	angular.module('skeleton-app.home', [
		'ui.router'
	]);

	function appConfig ($urlRouterProvider, $stateProvider) {
		$stateProvider
		.state('home', {
			url: 'home',
			parent: 'skeleton-app',
			views: {
				'content@': {
					templateUrl: 'home/home.html',
					controller: 'HomeController as HomeVm'
				}
			}
		});
	}

	angular.module('skeleton-app.home').config(appConfig);
})();