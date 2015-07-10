var app = angular.module('skeleton-app', [
	'ui.router',
	'skeleton-app.home'
]);

app.config(function ($urlRouterProvider, $stateProvider) {
	$stateProvider.state('skeleton-app', {
		url: '/',
		abstract: true,
		views : {
			'header': {
				templateUrl: 'header/header.html'
			},
			'footer' : {
				templateUrl: 'footer/footer.html'
			}
		}
	});

	$urlRouterProvider.otherwise('/home');
});

app.run(function ($rootScope) {
	$rootScope.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
});
