var home = angular.module('skeleton-app.home', ['ui.router']);

home.config(function ($stateProvider) {
	$stateProvider
	.state('home', {
		url: 'home',
		parent: 'skeleton-app',
		views: {
			'content@': {
				templateUrl: 'home/home.html',
				controller: 'HomeController'
			}
		}
	});
});