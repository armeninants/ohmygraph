/*
Copyright (C) 2015 Armen Inants

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
*/

'use strict';

/* App Module */

var semanticApp = angular.module('semanticExplorerApp', [
	'ngRoute',
	'semanticControllers'
]);

semanticApp.config(['$routeProvider', function($routeProvider) {

	var routeConfig = {
		templateUrl: 'partials/graph-explorer.html',
		controller: 'GraphCtrl'
	};

	$routeProvider
		.when('/', routeConfig)
		.otherwise({
			redirectTo: '/'
		});
}]);


$(document).ready(function() {

	var graph = {
		vertices: ['Russia', 'France', 'Armenia', 'United States of America', 'Country', 'Republic', 'Federation'],
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


	var width = 900, height = 600;

	var N = [], L = [], 
		tmp;

	function getBoxDim(text) {
		var span = document.createElement('span'),
			// t = document.createTextNode(text),
			classAttr = document.createAttribute('class');

  		classAttr.value = 'node-box-tmp';
 		span.setAttributeNode(classAttr);
		// span.appendChild(t);
		span.innerHTML = text;
		document.body.appendChild(span);

		var dim = {
			height: span.offsetHeight,
			width: span.offsetWidth
		};

		document.body.removeChild(span);
		return dim;
	}


	function getGraphCoordinates(nodes, links) {
		var force = d3.layout.force().size([width, height]),
			safety = 0;

		force.nodes(nodes).links(links)
			.linkDistance(function(d) { return d.distance; })
			.linkStrength(1)
			.friction(0.7)
			.gravity(0.4)
			.theta(0.4)
			.alpha(0.05)
			.charge(-5000)
			.start();
	
		while(force.alpha() > 0.05) { // You'll want to try out different, "small" values for this
			force.tick();
			if (safety++ > 500) {
				break; // Avoids infinite looping in case this solution was a bad idea
			}
		}
 		force.stop();
 		return force;
	}


	$.each(graph.vertices, function(i, vertice) {
		var node_ = getBoxDim(vertice);
		node_.label = vertice;
		node_.x = width/2;
		node_.y = height/2;
		// node_.weight = 500*Math.max(node_.height, node_.width);
		N.push(node_);
	});

	console.log(N);


	$.each(graph.edges, function(i, edge) {
		var s = edge[0],
			t = edge[1],
			h1 = N[edge[0]]['height'],
			w1 = N[edge[0]]['width'],
			h2 = N[edge[1]]['height'],
			w2 = N[edge[1]]['width'],
			r = 160,
			dist = Math.sqrt(h1 * h1 + w1 * w1)/2 + Math.sqrt(h2 * h2 + w2 * w2)/2 + r,
			link_ = {
				source: s,
				target: t,
				label: edge[2],
				distance: dist
			};

		L.push(link_);
	});	

	// console.log(L);

	var force = getGraphCoordinates(N,L);
	var nodes = force.nodes(),
		links = force.links();	


	// console.log(nodes);
	// console.log(links);

	function render() {
		link = link.data(links);

		link.enter().insert('line', '.node')
			.attr('class', 'link')
			.attr('x1', function(d) { return d.source.x; })
			.attr('y1', function(d) { return d.source.y; })
			.attr('x2', function(d) { return d.target.x; })
			.attr('y2', function(d) { return d.target.y; });

		node = node.data(nodes);

		node.enter().append('rect')
			.attr('width', function(d) { return d.width; })
			.attr('height', function(d) { return d.height; })
			.attr('class', 'node')
			.attr('x', function(d) { return d.x - d.width/2; })
			.attr('y', function(d) { return d.y - d.height/2; });
	}


	//--------------------------------------------

	var $nodeWrapper = $('#nodeWrapper')
		.css({
			height: height,
			width: width
		});

	var connections = [];

	$.each(nodes, function(i, node) {
		var $node = $('<div class="node-box">')
			.attr('id', 'node' + i)
			.css({
				left: node.x - node.width/2,
				top: node.y - node.height/2
			});

		$node.html(node.label)
			.appendTo($nodeWrapper);
		node.index = i;
	});


	$.each(links, function(i, link) {
		connections.push({
			source: link.source.index,
			target: link.target.index,
			label: link.label
		});
	});	

	// console.log(connections);



	jsPlumb.ready(function () {

	    var instance = jsPlumb.getInstance({
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

	        // loop through them and connect each one to each other one.
	        for (var i = 0; i < connections.length; i++) {
	            // for (var j = i + 1; j < edges.length; j++) {
	                instance.connect({
	                    source: edges[connections[i].source],  // just pass in the current node in the selector for source
	                    target: edges[connections[i].target],
	                    // here we supply a different anchor for source and for target, and we get the element's "data-shape"
	                    // attribute to tell us what shape we should use, as well as, optionally, a rotation value.
	                    anchors: [
	                        [ "Perimeter", { shape: 'Rectangle', rotation: 0 }],
	                        [ "Perimeter", { shape: 'Rectangle', rotation: 0 }]
	                    ],
	                    overlays: [
	                    	[ "Arrow", { width:10, length:10, location:1 } ],
	                    	["Label", {label: connections[i].label, location: 0.4, cssClass: 'label' }]
	                    ]
	                });
	            // }
	        }
	    });

	    jsPlumb.fire("jsPlumbDemoLoaded", instance);
	});


});




