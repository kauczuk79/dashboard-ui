(function (d3) {
    'use strict';
    /*global angular, console*/

    function FourteenSegmentDisplayDirective(svgUtils) {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                background = (scope.showBackground === "true"),
                iterator;
            scope.background = '~';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < digits - 1; iterator += 1) {
                scope.background += '.~';
            }
            if (background) {
                scope.opacity = 0.1;
            }
            element.ready(function() {
                var d3element = d3.select(element[0]),
                    width = d3element.select('text#background').node().getBBox().width;
                d3element.select('text#value').attr(svgUtils.transformAttr, svgUtils.translateString(width, 0));
            });
        }

        return {
            link: link,
            restrict: 'C',
            template: '<text id="background" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="{{opacity}}">{{background}}</text><text id="value" dominant-baseline="text-before-edge" writing-mode="lr">{{value}}</text>',
            scope: {
                digits: '@',
                value: '@',
                showBackground: '@'
            }
        };
    }

    FourteenSegmentDisplayDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
} (window.d3));