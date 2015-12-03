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
				originalBarX = parseInt(bar.attr('x'), 10) || 0,
				originalBarY = parseInt(bar.attr('y'), 10) || 0,
				stepWidth;
			function updateValue() {
				var value = scope.value || 0,
					barLength = Math.abs(stepWidth * value),
					currentX = 0,
                    currentY = 0,
                    height = 0,
                    width = 0;
				if (value >= 0 && value <= scope.maxValue) {
					currentY = originalBarY - barLength;
					height = barLength;
					currentX = originalBarX;
					width = barLength;
				} else if (value < 0 && value >= scope.minValue) {
					currentY = originalBarY;
					height = barLength;
					currentX = originalBarX - barLength;
					width = barLength;
				} else if (value > scope.maxValue) {
					currentY = scope.maxPosition;
					height = stepWidth * scope.maxValue;
					currentX = originalBarX;
					width = stepWidth * scope.maxValue;
				} else if (value < scope.minValue) {
					currentY = originalBarY;
					height = stepWidth * scope.minValue;
					currentX = scope.minPosition;
					width = stepWidth * scope.minValue;
				}
				if (scope.vertical) {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('y', currentY).attr('height', Math.abs(height));
				} else {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('x', currentX).attr('width', Math.abs(width));
				}
			}
			scope.x = scope.x || 0;
            scope.y = scope.y || 0;
			scope.vertical = scope.vertical || false;
			scope.minValue = scope.minValue || 0,
			scope.minPosition = scope.minPosition || 0,
			scope.maxPosition = scope.maxPosition || barWidth,
			stepWidth = ((scope.maxPosition - scope.minPosition) / (scope.maxValue - scope.minValue));
			meter.prependTranslate(scope.x,scope.y);
			scope.$watch('value', updateValue);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '=',
				maxValue: '=',
				minPosition: '=',
				maxPosition: '=',
				value: '=',
				vertical: '=',
				x: '=',
				y: '='
			}
		};
	}

	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
} (window.d3));