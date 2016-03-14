/*global window, angular*/
(function (d3) {
    'use strict';

    function AlphanumericLcdDirective() {
        function link(scope, element, attrs) {
            var RECTANGLE_CHAR = '\u0B8F',
                FOREGROUND_CLASS = 'foreground',
                BACKGROUND_CLASS = 'background',
                lcdGroup = d3.select(element[0]),
                lineIterator,
                fontHeight = 18,
                yPosition;
            scope.parameters = {
                rows: parseInt(scope.rows, 10) || 2,
                columns: parseInt(scope.columns, 10) || 16,
                scale: parseFloat(scope.scale) || 1.0,
                x: parseFloat(scope.x) || 0,
                y: parseFloat(scope.y) || 0,
                showBackground: scope.showBackground === 'true'
            };

            function trimLine(data) {
                return data.substring(0, scope.parameters.columns);
            }

            function fillLine(data) {
                var arr = [];
                arr.length = scope.parameters.columns + 1;
                return arr.join(data);
            }

            function updateLines() {
                var lineNumber,
                    lines = scope.lines;
                for (lineNumber = 0; lineNumber < scope.parameters.rows; lineNumber += 1) {
                    if (lines[lineNumber] !== undefined) {
                        d3.select(element[0])
                            .selectAll('.' + FOREGROUND_CLASS)
                            .data(lines)
                            .text(trimLine);
                    }
                }
            }
            scope.$watch('lines', updateLines);
            lcdGroup.prependTranslate(scope.parameters.x, scope.parameters.y);
            for (lineIterator = 0; lineIterator < scope.parameters.rows; lineIterator += 1) {
                yPosition = fontHeight * (lineIterator + 1);
                lcdGroup.append('text')
                    .classed(FOREGROUND_CLASS, true)
                    .attr('y', yPosition)
                    .prependScale(scope.parameters.scale);
                if (scope.parameters.showBackground) {
                    lcdGroup.append('text')
                        .classed(BACKGROUND_CLASS, true)
                        .attr('y', yPosition)
                        .prependScale(scope.parameters.scale)
                        .data(RECTANGLE_CHAR)
                        .text(fillLine);
                }
            }
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                rows: '@',
                columns: '@',
                scale: '@',
                showBackground: '@',
                lines: '=',
                x: '@',
                y: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
}(window.d3));
