(function (d3) {
	'use strict';
	/*global angular, console*/

	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var EASING_DURATION = 250,
				EASING = 'linear',
				meter = d3.select(element[0]),
				bar = meter.select('#bar'),
				barWidth = parseInt(bar.attr('width')) || 0,
                x = parseFloat(scope.x) || 0.0,
                y = parseFloat(scope.y) || 0.0,
                vertical = scope.vertical || false,
                minValue = parseFloat(scope.minValue) || 0.0,
                maxValue = parseFloat(scope.maxValue) || 0.0,
                minPosition = parseFloat(scope.minPosition) || 0.0,
                maxPosition = parseFloat(scope.maxPosition) || barWidth,
				originalBarX = parseFloat(bar.attr('x')) || 0,
				originalBarY = parseFloat(bar.attr('y')) || 0,
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			function updateValue() {
				var value = parseFloat(scope.value) || 0.0,
					barLength = Math.abs(stepWidth * value),
					currentX = 0,
                    currentY = 0,
                    height = 0,
                    width = 0;
				if (value >= 0 && value <= maxValue) {
					currentY = originalBarY - barLength;
					height = barLength;
					currentX = originalBarX;
					width = barLength;
				} else if (value < 0 && value >= minValue) {
					currentY = originalBarY;
					height = barLength;
					currentX = originalBarX - barLength;
					width = barLength;
				} else if (value > maxValue) {
					currentY = maxPosition;
					height = stepWidth * maxValue;
					currentX = originalBarX;
					width = stepWidth * maxValue;
				} else if (value < minValue) {
					currentY = originalBarY;
					height = stepWidth * minValue;
					currentX = minPosition;
					width = stepWidth * minValue;
				}
				if (vertical) {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('y', currentY).attr('height', Math.abs(height));
				} else {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('x', currentX).attr('width', Math.abs(width));
				}
			}
			meter.prependTranslate(x,y);
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
				value: '=',
				vertical: '@',
				x: '@',
				y: '@'
			}
		};
	}

	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
} (window.d3));