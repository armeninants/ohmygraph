'use strict';

/* App Module */

var semanticApp = angular.module('semanticExplorer', [
  'ngRoute',
  'semanticControllers'
]);

semanticApp.config(['$routeProvider', function($routeProvider) {

	var routeConfig = {
		templateUrl: 'js/partials/graph-explorer.html',
		controller: 'GraphCtrl'
	};

	$routeProvider
		.when('/', routeConfig)
		.otherwise({
			redirectTo: '/'
		});
}]);