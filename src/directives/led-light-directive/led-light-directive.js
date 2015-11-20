(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval, svgUtils) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                blinkingTimer;
            function toggleTurnOn() {
                var targetOpacity = 1.0;
                if(parseFloat(icon.style('opacity')) != 0.0) {
                    targetOpacity = 0.0;
                }
				icon.transition().duration(25).style('opacity', targetOpacity);
			}
			function toggleBlinking() {
				if(attrs.blinking === "true" && attrs.on === "true") {
                    blinkingTimer = $interval(toggleTurnOn, 500);
                } else {
                    $interval.cancel(blinkingTimer);
                }
			}
			
			
			scope.$watch('on', function() {
				toggleTurnOn();
			});
			scope.$watch('blinking', function() {
				toggleBlinking();
			});
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
				on: '@',
                blinking: '@'
            }
        };
    }

    LedLightDirective.$inject = ['$interval', 'svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('ledLight', LedLightDirective);
} (window.d3));