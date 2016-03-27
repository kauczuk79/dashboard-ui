/*global window, angular*/
(function (d3) {
    'use strict';

    function SevenSegmentDisplayDirective(templates, $filter) {
        function link(scope, element, attrs) {
            var d3element = d3.select(element[0]),
                iterator;
            scope.filteredValue = '';
            scope.parameters = {
                x: parseFloat(scope.x) || 0.0,
                y: parseFloat(scope.y) || 0.0,
                showBackground: scope.showBackground === 'true',
                digits: parseInt(scope.digits, 10) || 3
            };
            scope.$watch('value', function () {
                scope.filteredValue = $filter('sevenSegmentDisplayFilter')(scope.value);
            });
            d3element.prependTranslate(scope.parameters.x, scope.parameters.y);
            scope.background = '8';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < scope.parameters.digits - 1; iterator += 1) {
                scope.background += '.8';
            }
            if (scope.parameters.showBackground) {
                scope.opacity = 0.1;
            }
            element.ready(function () {
                var width = d3element.select('text#background')
                    .node()
                    .getBoundingClientRect()
                    .width;
                d3element.select('text#value')
                    .translate(width, 0);
            });
        }

        return {
            link: link,
            restrict: 'C',
            template: templates.segmentDisplayTemplate,
            scope: {
                digits: '@',
                value: '=',
                showBackground: '@',
                x: '@',
                y: '@'
            }
        };
    }

    SevenSegmentDisplayDirective.$inject = ['templates', '$filter'];

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
}(window.d3));
