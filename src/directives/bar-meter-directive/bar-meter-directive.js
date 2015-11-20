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
				maxValue = parseInt(scope.maxValue),
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			scope.$watch('value', function () {
				var value = parseInt(scope.value),
					barLength = Math.abs(stepWidth * value),
					x, y, height, width;
				if (vertical) {
					if (value >= 0 && value <= maxValue) {
						y = originalY - barLength;
						height = barLength;
					} else if (value < 0 && value >= minValue) {
						y = originalY;
						height = barLength;
					} else if (value > maxValue) {
						y = maxPosition;
						height = Math.abs(stepWidth * maxValue);
					} else if (value < minValue) {
						y = originalY;
						height = stepWidth * minValue;
					}
					bar.transition().duration(250).ease('linear').attr('y', y).attr('height', height);
				} else {
					if (value >= 0 && value <= maxValue) {
						x = originalX;
						width = barLength;
					} else if (value < 0 && value >= minValue) {
						x = originalX - barLength;
						width = barLength;
					} else if (value > maxValue) {
						x = originalX;
						width = stepWidth * maxValue;
					} else if (value < minValue) {
						x = minPosition;
						width = Math.abs(stepWidth * minValue);
					}
					bar.transition().duration(250).ease('linear').attr('x', x).attr('width', width);
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
} (window.d3));