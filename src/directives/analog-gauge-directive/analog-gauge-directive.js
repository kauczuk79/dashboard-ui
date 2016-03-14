/*global window, angular*/
(function (d3) {
    'use strict';

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node()
                    .getBoundingClientRect(),
                svgBBox = d3.select('svg')
                    .node()
                    .getBoundingClientRect(),
                deltaAngle,
                deltaValue;
            scope.parameters = {
                x: parseFloat(scope.x) || 0.0,
                y: parseFloat(scope.y) || 0.0,
                indicatorOriginX: parseFloat(scope.indicatorOriginX) || ((indicatorBoundingBox.left + indicatorBoundingBox.right) / 2) - svgBBox.left,
                indicatorOriginY: parseFloat(scope.indicatorOriginY) || (indicatorBoundingBox.bottom - svgBBox.top),
                startAngle: parseFloat(scope.startAngle) || 0.0,
                endAngle: parseFloat(scope.endAngle) || ((parseFloat(scope.startAngle) || 0.0) * -1),
                minValue: parseFloat(scope.minValue) || 0,
                maxValue: parseFloat(scope.maxValue) || 100.0
            };
            deltaAngle = scope.parameters.endAngle - scope.parameters.startAngle;
            deltaValue = scope.parameters.maxValue - scope.parameters.minValue;

            function updateGaugeAngle() {
                var value = parseFloat(scope.value),
                    angleDifference;
                if (value < scope.parameters.minValue) {
                    indicator.rotate(scope.parameters.startAngle);
                } else if (value > scope.parameters.maxValue) {
                    indicator.rotate(scope.parameters.endAngle);
                } else {
                    angleDifference = Math.abs((deltaAngle / deltaValue) * (scope.parameters.minValue - value));
                    if (scope.parameters.startAngle < scope.parameters.endAngle) {
                        indicator.rotate(scope.parameters.startAngle + angleDifference);
                    } else {
                        indicator.rotate(scope.parameters.startAngle - angleDifference);
                    }
                }
            }
            gaugeGroup.prependTranslate(scope.parameters.x, scope.parameters.y);
            indicator.transformOrigin(scope.parameters.indicatorOriginX, scope.parameters.indicatorOriginY)
                .style('transition', 'all 0.25s linear');
            scope.$watch('value', updateGaugeAngle);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                value: '=',
                startAngle: '@',
                endAngle: '@',
                maxValue: '@',
                minValue: '@',
                indicatorOriginX: '@',
                indicatorOriginY: '@',
                x: '@',
                y: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
}(window.d3));
