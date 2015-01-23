var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('app', {
		url: '/',
		views : {
			'header' : {
				templateUrl: 'partials/header.html'
			},
			'content': {
				templateUrl: 'partials/home.html',
				controller: 'HomeController'
			},
			'footer': {
				templateUrl: 'partials/footer.html'
			}
		}
	})
	.state('app.other', {
		url: 'other-view',
		views: {
			'content@': {
				templateUrl: 'partials/other-view.html',
				controller: 'OtherViewController'
			}
		}
	});
});