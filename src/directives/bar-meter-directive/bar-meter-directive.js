(function (d3) {
	'use strict';
	/*global angular, console*/

	function BarMeterDirective(svgUtils) {
		function link(scope, element, attrs) {
			var EASING_DURATION = 250,
				EASING = 'linear',
				x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
				maxValue = parseInt(scope.maxValue, 10),
				minValue = parseInt(scope.minValue, 10) || 0,
				minPosition = parseInt(scope.minPosition, 10) || 0,
				meter = d3.select(element[0]),
				bar = meter.select('#bar'),
				barWidth = parseInt(bar.attr('width')) || 0,
				maxPosition = parseInt(scope.maxPosition, 10) || barWidth,
				vertical = (scope.vertical === 'true'),
				originalBarX = parseInt(bar.attr('x'), 10) || 0,
				originalBarY = parseInt(bar.attr('y'), 10) || 0,
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			function updateValue() {
				var value = parseInt(scope.value, 10) || 0,
					barLength = Math.abs(stepWidth * value),
					currentX,
                    currentY,
                    height,
                    width;
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
			meter.attr(svgUtils.transformAttr, svgUtils.prependTransform(svgUtils.translateString(x, y), meter.attr(svgUtils.transformAttr)));
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
				vertical: '@',
				x: '@',
				y: '@'
			}
		};
	}
	
	BarMeterDirective.$inject = ['svgUtils'];

	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
} (window.d3));