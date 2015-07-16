var semanticControllers = angular.module('semanticControllers', []);

semanticControllers.controller('GraphCtrl', function ($scope) {
	'use strict';
	
	$scope.graph = {
		vertices: ['Russia', 'France', 'Armenia', 'United <select><option>States</option><option>Strokes</option></select> of America', 'Country', 'Republic', 'Federation'],
		edges: [
			[0, 4, 'rdf:type'],
			[1, 5, 'rdf:type'],
			[2, 5, 'rdf:type'],
			[5, 4, 'rdfs:subClassOf'],
			[6, 4, 'rdfs:subClassOf'],
			[0, 6, 'rdf:type'],
			[3, 4, 'rdf:type']
		]
	};


	$scope.width = 900;
	$scope.height = 600;

	$scope.$nodeWrapper = $('#nodeWrapper')
	.css({
		height: $scope.height,
		width: $scope.width
	});

	$scope.getBoxDim = function(html) {
		var span = document.createElement('span'),
			classAttr = document.createAttribute('class');

		classAttr.value = 'node-box-tmp';
		span.setAttributeNode(classAttr);
		span.innerHTML = html;
		document.body.appendChild(span);

		var dim = {
			height: span.offsetHeight,
			width: span.offsetWidth
		};

		document.body.removeChild(span);
		return dim;
	};


	$scope.prepareGraph = function(graph) {
		var nodes = $scope._getNodes(graph),
			links = $scope._getLinks(graph),
			links_ = jQuery.extend(true, {}, links),

			force = d3.layout.force().size([$scope.width, $scope.height]),
			safety = 0;

		force.nodes(nodes).links(links_)
			.linkDistance(function(d) { return d.distance; })
			.linkStrength(1)
			.friction(0.7)
			.gravity(0.4)
			.theta(0.4)
			.alpha(0.05)
			.charge(-5000)
			.start();
	
		while(force.alpha() > 0.05) {
			force.tick();
			if (safety++ > 500) { break; }
		}
		force.stop();
		return [nodes, links];
	};


	$scope._getNodes = function(graph) {
		var nodes = [];
		$.each(graph.vertices, function(i, vertice) {
			var node_ = $scope.getBoxDim(vertice);
			node_.label = vertice;
			node_.x = $scope.width/2;
			node_.y = $scope.height/2;
			node_.index = i;
			nodes.push(node_);
		});
		return $scope.nodes = nodes;
	};


	$scope._getLinks = function(graph) {
		var connections = [];
		$.each(graph.edges, function(i, edge) {
			var s = edge[0],
				t = edge[1],
				h1 = $scope.nodes[edge[0]]['height'],
				w1 = $scope.nodes[edge[0]]['width'],
				h2 = $scope.nodes[edge[1]]['height'],
				w2 = $scope.nodes[edge[1]]['width'],
				r = 160,
				dist = Math.sqrt(h1 * h1 + w1 * w1)/2 + Math.sqrt(h2 * h2 + w2 * w2)/2 + r,
				link_ = {
					source: s,
					target: t,
					label: edge[2],
					distance: dist
				};

			connections.push(link_);
		});	
		return $scope.connections = connections;
	};

	$scope.renderNodes = function() {
		$.each($scope.nodes, function(i, node) {
			$('<div class="node-box">')
				.attr('id', 'node' + i)
				.css({
					left: node.x - node.width/2,
					top: node.y - node.height/2
				})
				.html(node.label)
				.appendTo($scope.$nodeWrapper);
		});
	};

	$scope.renderLinks = function() {

		jsPlumb.ready(function () {
			var connections = $scope.connections,
				instance = jsPlumb.getInstance({
					Connector: "StateMachine",
					PaintStyle: { lineWidth: 2, strokeStyle: "#444" },
					Endpoint: [ "Blank", {} ],
					// EndpointStyle: { fillStyle: "#444" },
					Container: "nodeWrapper"
				});

			var edges = jsPlumb.getSelector('.node-box');
			// make everything draggable
			instance.draggable(edges);

			// suspend drawing and initialise.
			instance.batch(function () {
				for (var i = 0; i < connections.length; i++) {
					instance.connect({
						source: edges[connections[i].source],  // just pass in the current node in the selector for source
						target: edges[connections[i].target],
						anchors: [
							[ "Perimeter", { shape: 'Rectangle', rotation: 0 }],
							[ "Perimeter", { shape: 'Rectangle', rotation: 0 }]
						],
						overlays: [
							[ "Arrow", { width:10, length:10, location:1 } ],
							["Label", {label: connections[i].label, location: 0.4, cssClass: 'label' }]
						]
					});
				}
			});

			jsPlumb.fire("jsPlumbDemoLoaded", instance);
		});

	};

	$scope.visualizeGraph = function() {
		$scope.prepareGraph($scope.graph);
		$scope.renderNodes();
		$scope.renderLinks();
	};

	$scope.visualizeGraph();


});