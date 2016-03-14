/*global window, angular*/
(function (d3) {
    'use strict';

    function DotMeterDirective() {
        function link(scope, element, attrs) {
            var dotsCollection = d3.select(element[0]);
            scope.parameters = {
                maxValue: parseInt(scope.maxValue, 10) || 0,
                minValue: parseInt(scope.minValue, 10) || 0,
                x: parseFloat(scope.x) || 0,
                y: parseFloat(scope.y) || 0
            };

            function updateValue() {
                var value = parseInt(scope.value, 10) || 0;
                if (value > scope.parameters.maxValue) {
                    value = scope.parameters.maxValue;
                } else if (value < scope.parameters.minValue) {
                    value = scope.parameters.minValue;
                }
                dotsCollection.selectAll('[id^=dot]')[0].forEach(function (domElement) {
                    var opacity = 1.0,
                        selection = d3.select(domElement);
                    if (parseInt(selection.attr('data-value'), 10) > value) {
                        opacity = 0.0;
                    }
                    selection.opacity(opacity);
                });
            }
            dotsCollection.prependTranslate(scope.parameters.x, scope.parameters.y);
            scope.$watch('value', updateValue);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                minValue: '@',
                maxValue: '@',
                value: '=',
                x: '@',
                y: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('dotMeter', DotMeterDirective);
}(window.d3));
