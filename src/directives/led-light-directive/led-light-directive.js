(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                blinkingTimer;
            scope.parameters = {
                y: parseFloat(scope.y) || 0.0,
                x: parseFloat(scope.x) || 0.0,
                blinkingInterval: parseInt(scope.blinkingInterval, 10) || 500,
                blinkingDelay: parseInt(scope.blinkingDelay, 10) || 0,
                turnOnLevel: parseFloat(scope.turnOnLevel) || 1.0,
                turnOffLevel: parseFloat(scope.turnOffLevel) || 0.0
            };
            function turnOn() {
                $interval.cancel(blinkingTimer);
                icon.opacity(scope.parameters.turnOnLevel);
            }
            function turnOff() {
                $interval.cancel(blinkingTimer);
                icon.opacity(scope.parameters.turnOffLevel);
            }
            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (icon.opacity() === scope.parameters.turnOnLevel) {
                        icon.opacity(scope.parameters.turnOffLevel);
                    } else {
                        icon.opacity(scope.parameters.turnOnLevel);
                    }
                }, scope.parameters.blinkingInterval);
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
            icon.prependTranslate(scope.parameters.x, scope.parameters.y);
            if (scope.parameters.blinkingDelay > 0) {
                icon.style('transition', 'all ' + (scope.parameters.blinkingDelay / 1000) + 's linear 0s');
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