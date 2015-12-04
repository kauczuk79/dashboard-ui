(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval) {
        function link(scope, element, attrs) {
            var x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
                icon = d3.select(element[0]),
                blinkingInterval = parseInt(scope.blinkingInterval) || 500,
                blinkingDelay = parseInt(scope.blinkingDelay),
                turnOnLevel = parseFloat(scope.turnOnLevel) || 1.0,
                turnOffLevel = parseFloat(scope.turnOffLevel) || 0.0,
                blinkingTimer;
            function turnOn() {
                $interval.cancel(blinkingTimer);
                icon.opacity(turnOnLevel);
            }
            function turnOff() {
                $interval.cancel(blinkingTimer);
                icon.opacity(turnOffLevel);
            }
            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (icon.opacity() === turnOnLevel) {
                        icon.opacity(turnOffLevel);
                    } else {
                        icon.opacity(turnOnLevel);
                    }
                }, blinkingInterval);
            }
            icon.prependTranslate(x, y);
            if (!isNaN(blinkingInterval)) {
                icon.style('transition', 'all ' + (blinkingDelay / 1000) + 's linear 0s');
            }
            scope.$watch('mode', function () {
                if (scope.mode.toLowerCase() === 'on') {
                    turnOn();
                } else if (scope.mode.toLowerCase() === 'blinking') {
                    blinkingMode();
                } else {
                    turnOff();
                }
            });
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                mode: '@',
                turnOffLevel: '@',
                turnOnLevel: '@',
                blinkingInterval: '@',
                blinkingDelay: '@',
                x: '@',
                y: '@'
            }
        };
    }

    LedLightDirective.$inject = ['$interval'];

    angular
        .module('dashboard-ui.directives')
        .directive('ledLight', LedLightDirective);
} (window.d3));