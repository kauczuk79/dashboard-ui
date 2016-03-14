/*global window, angular*/
(function (d3) {
    'use strict';

    function BarMeterDirective() {
        function link(scope, element, attrs) {
            var EASING_DURATION = 250,
                EASING = 'linear',
                meter = d3.select(element[0]),
                bar = meter.select('#bar'),
                barWidth = parseInt(bar.attr('width'), 10) || 0,
                stepWidth;
            scope.parameters = {
                x: parseFloat(scope.x) || 0.0,
                y: parseFloat(scope.y) || 0.0,
                vertical: scope.vertical === 'true',
                minValue: parseFloat(scope.minValue) || 0.0,
                maxValue: parseFloat(scope.maxValue) || 0.0,
                minPosition: parseFloat(scope.minPosition) || 0.0,
                maxPosition: parseFloat(scope.maxPosition) || barWidth,
                originalBarX: parseFloat(bar.attr('x')) || 0,
                originalBarY: parseFloat(bar.attr('y')) || 0
            };
            stepWidth = ((scope.parameters.maxPosition - scope.parameters.minPosition) / (scope.parameters.maxValue - scope.parameters.minValue));

            function updateValue() {
                var value = parseFloat(scope.value) || 0.0,
                    barLength = Math.abs(stepWidth * value),
                    currentX = 0,
                    currentY = 0,
                    height = 0,
                    width = 0;
                if (value >= 0 && value <= scope.parameters.maxValue) {
                    currentY = scope.parameters.originalBarY - barLength;
                    height = barLength;
                    currentX = scope.parameters.originalBarX;
                    width = barLength;
                } else if (value < 0 && value >= scope.parameters.minValue) {
                    currentY = scope.parameters.originalBarY;
                    height = barLength;
                    currentX = scope.parameters.originalBarX - barLength;
                    width = barLength;
                } else if (value > scope.parameters.maxValue) {
                    currentY = scope.parameters.maxPosition;
                    height = stepWidth * scope.parameters.maxValue;
                    currentX = scope.parameters.originalBarX;
                    width = stepWidth * scope.parameters.maxValue;
                } else if (value < scope.parameters.minValue) {
                    currentY = scope.parameters.originalBarY;
                    height = stepWidth * scope.parameters.minValue;
                    currentX = scope.parameters.minPosition;
                    width = stepWidth * scope.parameters.minValue;
                }
                if (scope.parameters.vertical) {
                    bar.transition()
                        .duration(EASING_DURATION)
                        .ease(EASING)
                        .attr('y', currentY)
                        .attr('height', Math.abs(height));
                } else {
                    bar.transition()
                        .duration(EASING_DURATION)
                        .ease(EASING)
                        .attr('x', currentX)
                        .attr('width', Math.abs(width));
                }
            }
            meter.prependTranslate(scope.parameters.x, scope.parameters.y);
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
}(window.d3));
