(function (d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node().getBoundingClientRect(),
                svgBBox = d3.select('svg').node().getBoundingClientRect(),
                x = parseFloat(scope.x) || 0.0,
                y = parseFloat(scope.y) || 0.0,
                indicatorOriginX = parseFloat(scope.indicatorOriginX) || ((indicatorBoundingBox.left + indicatorBoundingBox.right) / 2) - svgBBox.left,
                indicatorOriginY = parseFloat(scope.indicatorOriginY) || (indicatorBoundingBox.bottom - svgBBox.top),
                startAngle = parseFloat(scope.startAngle) || 0.0,
                endAngle = parseFloat(scope.endAngle) || (startAngle * -1),
                minValue = parseFloat(scope.minValue) || 0,
                maxValue = parseFloat(scope.maxValue) || 100.0,
                deltaAngle = endAngle - startAngle,
                deltaValue = maxValue - minValue;
            function updateGaugeAngle() {
                var value = parseFloat(scope.value);
                if (value < minValue) {
                    indicator.rotate(startAngle);
                } else if (value > maxValue) {
                    indicator.rotate(endAngle);
                } else {
                    var angleDifference = Math.abs((deltaAngle / deltaValue) * (minValue - value));
                    if (startAngle < endAngle) {
                        indicator.rotate(startAngle + angleDifference);
                    } else {
                        indicator.rotate(startAngle - angleDifference);
                    }
                }
            }
            gaugeGroup.prependTranslate(x,y);
            indicator.transformOrigin(indicatorOriginX, indicatorOriginY).style('transition', 'all 0.25s linear');
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
} (window.d3));