(function (d3) {
    'use strict';
    /*global angular, console*/

    function SevenSegmentDisplayDirective(svgUtils) {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '8';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < digits - 1; iterator += 1) {
                scope.background += '.8';
            }
            if (background) {
                scope.opacity = 0.1;
            }
            scope.$watch('value', function () {
                var width = d3.select(element[0]).select('text#background').node().getBBox().width;
                d3.select(element[0]).select('text#value').attr(svgUtils.transformAttr, svgUtils.translateString(width, 0));
            }, true);
        }

        return {
            link: link,
            restrict: 'C',
            template: '<text id="background" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="{{opacity}}">{{background}}</text><text id="value" dominant-baseline="text-before-edge" writing-mode="lr">{{value}}</text>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    SevenSegmentDisplayDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
} (window.d3));