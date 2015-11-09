(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui', ['ngRoute', 'dashboard-ui.directives']);
}());
(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui.directives', []);
}());
(function(d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var startAngle = parseInt(scope.startAngle, 10),
                maxValue = parseInt(scope.maxValue, 10),
                endAngle = parseInt(scope.endAngle, 10) || (startAngle * -1),
                minValue = parseInt(scope.minValue, 10) || 0,
                indicator = d3.select(element[0]).select('#indicator'),
                indicatorBoundingBox = indicator.node().getBBox(),
                indicatorOriginX = scope.indicatorOriginX || (indicatorBoundingBox.x + (indicatorBoundingBox.width / 2)),
                indicatorOriginY = scope.indicatorOriginY || (indicatorBoundingBox.y + (indicatorBoundingBox.height / 2)),
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
                    deltaAngle = Math.abs(endAngle - startAngle);
                    if (startAngle < endAngle) {
                        //clockwise
                        angle = startAngle + Math.abs((deltaAngle / deltaValue) * (minValue - value));
                    } else {
                        //counter clockwise
                        angle = startAngle - Math.abs((deltaAngle / deltaValue) * (minValue - value));
                    }
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
                endAngle: '@',
                maxValue: '@',
                minValue: '@',
                indicatorOriginX: '@',
                indicatorOriginY: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
}(window.d3));
(function () {
    'use strict';
    /*global angular, console*/

    function FourteenSegmentDisplayDirective() {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                value = scope.value,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '';
            if (background) {
                scope.background = '~';
                for (iterator = 0; iterator < digits - 1; iterator += 1) {
                    scope.background += '.~';
                }
            }
        }

        return {
            link: link,
            restrict: 'E',
            template: '<span class="background">{{background}}</span><span class="foreground">{{value}}</span>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
}());
(function () {
    'use strict';
    /*global angular, console*/

    function SevenSegmentDisplayDirective() {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                value = scope.value,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '';
            if (background) {
                scope.background = '8';
                for (iterator = 0; iterator < digits - 1; iterator += 1) {
                    scope.background += '.8';
                }
            }
        }

        return {
            link: link,
            restrict: 'E',
            template: '<span class="background">{{background}}</span><span class="foreground">{{value}}</span>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
}());