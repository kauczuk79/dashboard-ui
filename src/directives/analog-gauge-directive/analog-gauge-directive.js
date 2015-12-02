(function (d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node().getBoundingClientRect(),
                svgBBox = d3.select('svg').node().getBoundingClientRect(),
                angle,
                deltaAngle,
                deltaValue;
            function updateGaugeAngle() {
                var value = scope.value;
                if (value < scope.minValue) {
                    angle = scope.startAngle;
                } else if (value > scope.maxValue) {
                    angle = scope.endAngle;
                } else {
                    var angleDifference = Math.abs((deltaAngle / deltaValue) * (scope.minValue - value));
                    if (scope.startAngle < scope.endAngle) {
                        angle = scope.startAngle + angleDifference;
                    } else {
                        angle = scope.startAngle - angleDifference;
                    }
                }
                indicator.rotate(angle);
            }
            scope.x = scope.x || 0.0;
            scope.y = scope.y || 0.0;
            scope.indicatorOriginX = scope.indicatorOriginX || ((indicatorBoundingBox.left + indicatorBoundingBox.right) / 2) - svgBBox.left;
            scope.indicatorOriginY = scope.indicatorOriginY || (indicatorBoundingBox.bottom - svgBBox.top);
            gaugeGroup.prependTranslate(scope.x,scope.y);
            scope.endAngle = scope.endAngle || (scope.startAngle * -1);
            scope.minValue = scope.minValue || 0;
            deltaAngle = scope.endAngle - scope.startAngle;
            deltaValue = scope.maxValue - scope.minValue;
            indicator.transformOrigin(scope.indicatorOriginX, scope.indicatorOriginY).style('transition', 'all 0.25s linear');
            scope.$watch('value', updateGaugeAngle);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                value: '=',
                startAngle: '=',
                endAngle: '=',
                maxValue: '=',
                minValue: '=',
                indicatorOriginX: '=',
                indicatorOriginY: '=',
                x: '=',
                y: '='
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
} (window.d3));