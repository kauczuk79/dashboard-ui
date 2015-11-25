(function (d3) {
	'use strict';
	/*global angular*/

	function DotMeterDirective(svgUtils) {
		function link(scope, element, attrs) {
			var minValue = parseInt(scope.minValue, 10) || 0,
				maxValue = parseInt(scope.maxValue, 10),
				x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
				dotsCollection = d3.select(element[0]);
			function changeValue() {
				var value = parseInt(scope.value, 10) || 0;
				if (value > maxValue) {
					value = maxValue;
				} else if (value < minValue) {
					value = minValue;
				}
				dotsCollection.selectAll('[id^=dot]')[0].forEach(function(domElement) {
					var opacity = 1.0,
						selection = d3.select(domElement);
					if(parseInt(selection.attr('data-value'), 10) > value) {
						opacity = 0.0;
					}
					selection.style(svgUtils.opacityStyle, opacity);
				});
				
			}
			dotsCollection.prependAttr(svgUtils.transformAttr, svgUtils.translateString(x, y));
			scope.$watch('value', changeValue);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '@',
				maxValue: '@',
				value: '@',
				x: '@',
				y: '@'
			}
		}
	}
	
	DotMeterDirective.$inject = ['svgUtils'];

	angular
		.module('dashboard-ui.directives')
		.directive('dotMeter', DotMeterDirective);
} (window.d3));