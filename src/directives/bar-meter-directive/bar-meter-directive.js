(function (d3) {
	'use strict';
	/*global angular, console*/

	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var EASING_DURATION = 250,
				EASING = 'linear',
				bar = d3.select(element[0]).select('#bar'),
				barWidth = parseInt(bar.attr('width')) || 0,
				maxValue = parseInt(scope.maxValue, 10),
				minValue = parseInt(scope.minValue, 10) || 0,
				minPosition = parseInt(scope.minPosition, 10) || 0,
				maxPosition = parseInt(scope.maxPosition, 10) || barWidth,
				vertical = (scope.vertical === 'true'),
				originalX = parseInt(bar.attr('x'), 10) || 0,
				originalY = parseInt(bar.attr('y'), 10) || 0,
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			function updateValue() {
				var value = parseInt(scope.value, 10) || 0,
					barLength = Math.abs(stepWidth * value),
					x,
                    y,
                    height,
                    width;
				if (value >= 0 && value <= maxValue) {
					y = originalY - barLength;
					height = barLength;
					x = originalX;
					width = barLength;
				} else if (value < 0 && value >= minValue) {
					y = originalY;
					height = barLength;
					x = originalX - barLength;
					width = barLength;
				} else if (value > maxValue) {
					y = maxPosition;
					height = stepWidth * maxValue;
					x = originalX;
					width = stepWidth * maxValue;
				} else if (value < minValue) {
					y = originalY;
					height = stepWidth * minValue;
					x = minPosition;
					width = stepWidth * minValue;
				}
				if (vertical) {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('y', y).attr('height', Math.abs(height));
				} else {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('x', x).attr('width', Math.abs(width));
				}
			}
			scope.$watch('value', updateValue);
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
		};
	}

	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
} (window.d3));