var semanticControllers = angular.module('semanticControllers', []);

semanticControllers.controller('GraphCtrl', function ($scope) {
	'use strict';
	
	$scope.graph = {
		vertices: ['A', 'B', 'C'],
		edges: [
			[0, 1, 'x'],
			[1, 2, 'y'],
			[0, 2, 'z'],
			[1, 0, 'u'],
			[1, 2, 'v']
		]
	};

});