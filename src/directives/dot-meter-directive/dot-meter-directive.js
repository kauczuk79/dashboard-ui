(function (d3) {
	'use strict';
	/*global angular*/

	function DotMeterDirective() {
		function link(scope, element, attrs) {
			var dotsCollection = d3.select(element[0]);
			function updateValue() {
				var value = scope.value || 0;
				if (value > scope.maxValue) {
					value = scope.maxValue;
				} else if (value < scope.minValue) {
					value = scope.minValue;
				}
				dotsCollection.selectAll('[id^=dot]')[0].forEach(function(domElement) {
					var opacity = 1.0,
						selection = d3.select(domElement);
					if(parseInt(selection.attr('data-value'), 10) > value) {
						opacity = 0.0;
					}
					selection.opacity(opacity);
				});
			}
			scope.minValue = scope.minValue || 0;
			scope.x = scope.x || 0;
            scope.y = scope.y || 0;
			dotsCollection.prependTranslate(scope.x, scope.y);
			scope.$watch('value', updateValue);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '=',
				maxValue: '=',
				value: '=',
				x: '=',
				y: '='
			}
		}
	}

	angular
		.module('dashboard-ui.directives')
		.directive('dotMeter', DotMeterDirective);
} (window.d3));