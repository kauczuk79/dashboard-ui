(function (d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective(svgUtils) {
        function link(scope, element, attrs) {
            var startAngle = parseInt(scope.startAngle, 10),
                maxValue = parseInt(scope.maxValue, 10),
                endAngle = parseInt(scope.endAngle, 10) || (startAngle * -1),
                minValue = parseInt(scope.minValue, 10) || 0,
                x = parseFloat(scope.x) || 0.0,
                y = parseFloat(scope.y) || 0.0,
                gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node().getBBox(),
                indicatorOriginX = scope.indicatorOriginX || (indicatorBoundingBox.x + (indicatorBoundingBox.width / 2)),
                indicatorOriginY = scope.indicatorOriginY || (indicatorBoundingBox.y + (indicatorBoundingBox.height / 2)),
                angle,
                deltaAngle = endAngle - startAngle,
                deltaValue = maxValue - minValue;

            function updateGaugeAngle() {
                var value = parseInt(scope.value, 10);
                if (value < minValue) {
                    angle = startAngle;
                } else if (value > maxValue) {
                    angle = endAngle;
                } else {
                    var angleDifference = Math.abs((deltaAngle / deltaValue) * (minValue - value)),
                        clockwise = startAngle < endAngle;
                    if (clockwise) {
                        angle = startAngle + angleDifference;
                    } else {
                        angle = startAngle - angleDifference;
                    }
                }
                indicator.style(svgUtils.transformAttr, svgUtils.rotateString(angle));
            }
            gaugeGroup.attr(svgUtils.transformAttr, svgUtils.prependTransform(svgUtils.translateString(x, y), gaugeGroup.attr(svgUtils.transformAttr)));
            indicator.style(svgUtils.transformOriginAttr, svgUtils.transformOriginString(indicatorOriginX, indicatorOriginY));
            scope.$watch('value', updateGaugeAngle);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                value: '@',
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

    AnalogGaugeDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
} (window.d3));