(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                y = parseFloat(scope.y) || 0.0,
                x = parseFloat(scope.x) || 0.0,
                blinkingInterval = parseInt(scope.blinkingInterval, 10) || 500,
                blinkingDelay = parseInt(scope.blinkingDelay, 10) || 0,
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
            function updateLightMode() {
                if (scope.mode.toLowerCase() === 'on') {
                    turnOn();
                } else if (scope.mode.toLowerCase() === 'blinking') {
                    blinkingMode();
                } else {
                    turnOff();
                }
            }
            icon.prependTranslate(x, y);
            if (blinkingDelay > 0) {
                icon.style('transition', 'all ' + (blinkingDelay / 1000) + 's linear 0s');
            }
            attrs.$observe('mode', updateLightMode);
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