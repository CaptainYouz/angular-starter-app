var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});
});