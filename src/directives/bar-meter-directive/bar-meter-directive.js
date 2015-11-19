(function (d3) {
	'use strict';
	/*global angular, console*/
	
	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var bar = d3.select(element[0]).select('#bar'),
				bbox = bar.node().getBBox()
			function calculatePercent(value) {
				return (value / (scope.max - scope.min));
			}
			bar.style('transform-origin', bbox.x+'px '+bbox.y+'px');
			scope.$watch('value', function () {
				var widthScale = calculatePercent(scope.value);
				if(parseInt(scope.value) < parseInt(scope.min)) {
					widthScale = calculatePercent(scope.min);
				} else if (parseInt(scope.value) > parseInt(scope.max)) {
					widthScale = calculatePercent(scope.max);
				}
				d3.select(element[0]).select('#bar').transition().duration(250).ease("linear").attr('transform', 'scale('+widthScale+',1)');
			});
		}
		
		return {
			link: link,
			restrict: 'C',
			scope: {
				min: '@',
				max: '@',
				value: '@'
			}
		}
	}
	
	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
}(window.d3));