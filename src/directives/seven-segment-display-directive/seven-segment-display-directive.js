(function (d3) {
    'use strict';
    /*global angular, console*/

    function SevenSegmentDisplayDirective(templates) {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                background = (scope.showBackground === "true"),
                x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
                d3element = d3.select(element[0]),
                iterator;
            d3element.prependTranslate(x, y);
            scope.background = '8';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < digits - 1; iterator += 1) {
                scope.background += '.8';
            }
            if (background) {
                scope.opacity = 0.1;
            }
            element.ready(function() {
                var width = d3element.select('text#background').node().getBBox().width;
                d3element.select('text#value').translate(width, 0);
            });
        }

        return {
            link: link,
            restrict: 'C',
            template: templates.segmentDisplayTemplate,
            scope: {
                digits: '@',
                value: '@',
                showBackground: '@',
                x: '@',
                y: '@'
            }
        };
    }

    SevenSegmentDisplayDirective.$inject = ['templates'];

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
} (window.d3));