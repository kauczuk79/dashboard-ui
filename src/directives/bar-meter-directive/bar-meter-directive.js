(function (d3) {
	'use strict';
	/*global angular, console*/

	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var EASING_DURATION = 250,
				EASING = 'linear',
				bar = d3.select(element[0]).select('#bar'),
				vertical = (scope.vertical === 'true') || false,
				originalX = parseInt(bar.attr('x'), 10),
				originalY = parseInt(bar.attr('y'), 10),
				maxPosition = parseInt(scope.maxPosition, 10),
				minPosition = parseInt(scope.minPosition, 10),
				minValue = parseInt(scope.minValue, 10),
				maxValue = parseInt(scope.maxValue, 10),
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			scope.$watch('value', function () {
				var value = parseInt(scope.value, 10),
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
						height = stepWidth * maxValue;
					} else if (value < minValue) {
						y = originalY;
						height = stepWidth * minValue;
					}
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('y', y).attr('height', Math.abs(height));
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
						width = stepWidth * minValue;
					}
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('x', x).attr('width', Math.abs(width));
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