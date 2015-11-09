(function(d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var startAngle = parseInt(scope.startAngle, 10),
                maxValue = parseInt(scope.maxValue, 10),
                endAngle = parseInt(scope.endAngle, 10) || (startAngle * -1),
                minValue = parseInt(scope.minValue, 10) || 0,
                indicator = d3.selectAll('analog-gauge').select('#indicator'),
                indicatorDimensions = indicator.node().getBBox(),
                indicatorOriginX = scope.indicatorOriginX || (indicatorDimensions.x + (indicatorDimensions.width / 2)),
                indicatorOriginY = scope.indicatorOriginY || (indicatorDimensions.y + (indicatorDimensions.height / 2)),
                angle,
                deltaAngle = 0,
                deltaValue = maxValue - minValue;

            function updateGaugeAngle() {
                var value = parseInt(scope.value, 10);
                if (value < minValue) {
                    angle = startAngle;
                } else if (value > maxValue) {
                    angle = endAngle;
                } else {
                    if (startAngle < endAngle) {
                        //clockwise
                        deltaAngle = (endAngle - startAngle);
                    } else if (startAngle > endAngle) {
                        //counter clockwise
                        deltaAngle = (startAngle - endAngle);
                    }
                    angle = startAngle + ((deltaAngle / deltaValue) * value);
                    indicator.style('transform-origin', indicatorOriginX + 'px ' + indicatorOriginY + 'px');
                    indicator.style('transform', 'rotate(' + angle + 'deg)');
                }
            }

            scope.$watch('value', function() {
                updateGaugeAngle();
            }, true);
        }

        return {
            link: link,
            restrict: 'E',
            scope: {
                value: '@',
                startAngle: '@',
                maxValue: '@',
                indicatorOriginX: '@',
                indicatorOriginY: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
}(window.d3));