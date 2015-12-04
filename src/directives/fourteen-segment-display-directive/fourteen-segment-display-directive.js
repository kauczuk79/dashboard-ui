(function (d3) {
    'use strict';
    /*global angular, console*/

    function FourteenSegmentDisplayDirective(templates) {
        function link(scope, element, attrs) {
            var d3element = d3.select(element[0]),
                iterator;
            scope.x = scope.x || 0,
            scope.y = scope.y || 0,
            scope.showBackground = scope.showBackground || false;
            d3element.prependTranslate(scope.x, scope.y);
            scope.background = '~';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < scope.digits - 1; iterator += 1) {
                scope.background += '.~';
            }
            if (scope.showBackground) {
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
                digits: '=',
                value: '=',
                showBackground: '=',
                x: '=',
                y: '='
            }
        };
    }

    FourteenSegmentDisplayDirective.$inject = ['templates'];

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
} (window.d3));