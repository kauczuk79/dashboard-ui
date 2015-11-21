(function (d3) {
	'use strict';
	/*global angular*/

	function DotBarMeterDirective() {
		function link(scope, element, attrs) {
			var minValue = parseInt(scope.minValue, 10) || 0,
				maxValue = parseInt(scope.maxValue, 10),
				dotsCollection = d3.select(element[0]);
			function changeValue() {
				var value = parseInt(scope.value, 10);
				if (value > maxValue) {
					value = maxValue;
				}
				if (value < minValue) {
					value = minValue;
				}
				dotsCollection.selectAll('[id^=dot]')[0].forEach(function(domElement) {
					var opacity = 1.0;
					if(parseInt(domElement.attributes['data-value'].value, 10) > value) {
						opacity = 0.0
					}
					d3.select(domElement).style('opacity', opacity);
				});
				
			}
			scope.$watch('value', function () {
				changeValue();
			}, true);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '@',
				maxValue: '@',
				value: '@'
			}
		}
	}

	angular
		.module('dashboard-ui.directives')
		.directive('dotBarMeter', DotBarMeterDirective);
} (window.d3));