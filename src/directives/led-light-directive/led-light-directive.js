(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval, svgUtils) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                blinkingTime = parseInt(scope.blinkingTime) || 25,
                turnOnLevel = parseFloat(scope.turnOnLevel) || 1.0,
                turnOffLevel = parseFloat(scope.turnOffLevel) || 0.0,
                blinkingTimer;
            function setOpacity(opacity) {
                icon.transition().duration(blinkingTime).style(svgUtils.opacityStyle, opacity);
            }
            function isVisible() {
                return parseFloat(icon.style(svgUtils.opacityStyle)) === turnOnLevel;
            }
            function turnOn() {
                $interval.cancel(blinkingTimer);
                setOpacity(turnOnLevel);
            }
            function turnOff() {
                $interval.cancel(blinkingTimer);
                setOpacity(turnOffLevel);
            }
            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (isVisible()) {
                        setOpacity(turnOffLevel);
                    } else {
                        setOpacity(turnOnLevel);
                    }
                }, 500);
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
                blinkingTime: '@'
            }
        };
    }

    LedLightDirective.$inject = ['$interval', 'svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('ledLight', LedLightDirective);
} (window.d3));