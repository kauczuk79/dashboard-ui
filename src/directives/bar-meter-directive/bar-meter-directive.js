(function (d3) {
	'use strict';
	/*global angular, console*/
	
	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var bar = d3.select(element[0]).select('#bar'),
				vertical = (scope.vertical === 'true') || false,
				originalX = parseInt(bar.attr('x')),
				//originalY = parseInt(bar.attr('y')),
				maxPosition = parseInt(scope.maxPosition),
				minPosition = parseInt(scope.minPosition),
				minValue = parseInt(scope.minValue),
				maxValue = parseInt(scope.maxValue),
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			scope.$watch('value', function () {
				var value = parseInt(scope.value),
					width = Math.abs(stepWidth * value);
				if(vertical) {
					
				} else {
					if(value >= 0 && value <= maxValue) {
						bar.transition().duration(250).ease('linear').attr('x', originalX).attr('width', stepWidth * value);
					} else if (value < 0 && value >= minValue) {
						bar.transition().duration(250).ease('linear').attr('x', originalX - width).attr('width', width);
					} else if (value > maxValue) {
						bar.transition().duration(250).ease('linear').attr('x', originalX).attr('width', stepWidth * maxValue);
					} else if (value < minValue){
						bar.transition().duration(250).ease('linear').attr('x', minPosition).attr('width', Math.abs(stepWidth * minValue));
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