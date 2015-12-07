(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                blinkingTimer;
            function turnOn() {
                $interval.cancel(blinkingTimer);
                icon.opacity(scope.turnOnLevel);
            }
            function turnOff() {
                $interval.cancel(blinkingTimer);
                icon.opacity(scope.turnOffLevel);
            }
            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (icon.opacity() === scope.turnOnLevel) {
                        icon.opacity(scope.turnOffLevel);
                    } else {
                        icon.opacity(scope.turnOnLevel);
                    }
                }, scope.blinkingInterval);
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
            scope.y = scope.y || 0.0;
            scope.x = scope.x || 0.0;
            scope.blinkingInterval = scope.blinkingInterval || 500;
            scope.blinkingDelay = scope.blinkingDelay || 0;
            scope.turnOnLevel = scope.turnOnLevel || 1.0;
            scope.turnOffLevel = scope.turnOffLevel || 0.0;
            icon.prependTranslate(scope.x, scope.y);
            if (scope.blinkingDelay > 0) {
                icon.style('transition', 'all ' + (scope.blinkingDelay / 1000) + 's linear 0s');
            }
            attrs.$observe('mode', updateLightMode);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                mode: '@',
                turnOffLevel: '=',
                turnOnLevel: '=',
                blinkingInterval: '=',
                blinkingDelay: '=',
                x: '=',
                y: '='
            }
        };
    }

    LedLightDirective.$inject = ['$interval'];

    angular
        .module('dashboard-ui.directives')
        .directive('ledLight', LedLightDirective);
} (window.d3));