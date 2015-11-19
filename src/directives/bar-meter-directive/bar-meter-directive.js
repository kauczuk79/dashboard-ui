(function (d3) {
	'use strict';
	/*global angular, console*/
	
	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var bar = d3.select(element[0]).select('#bar'),
				vertical = (scope.vertical === 'true') || false,
				originalX = parseInt(bar.attr('x')),
				originalY = parseInt(bar.attr('y')),
				maxPosition = parseInt(scope.maxPosition),
				minPosition = parseInt(scope.minPosition),
				minValue = parseInt(scope.minValue),
				maxValue = parseInt(scope.maxValue);
			scope.$watch('value', function () {
				var barLength = maxPosition - minPosition,
					valueDelta = maxValue - minValue,
					width = Math.abs((barLength / valueDelta) * parseInt(scope.value)),
					value = parseInt(scope.value);
				if(vertical) {
					
				} else {
					if(value >= 0 && value <= maxValue) {
						bar.transition().duration(250).ease('linear').attr('x', originalX).attr('width', width);
					} else if (value < 0 && value >= minValue) {
						bar.transition().duration(250).ease('linear').attr('width', width).attr('x', originalX - width)
					} else if (value > maxValue) {
						//bar.transition().duration(250).ease('linear').attr('width', maxPosition).attr('x', originalX);
					} else if (value < minValue){
						//bar.transition().duration(250).ease('linear').attr('x', minPosition).attr('width', originalX);
					}
				}
			});
		}
		
		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '@',
				maxValue: '@',
				minPosition: '@',
				maxPosition: '@',
				value: '@',
				vertical: '@'
			}
		}
	}
	
	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
}(window.d3));