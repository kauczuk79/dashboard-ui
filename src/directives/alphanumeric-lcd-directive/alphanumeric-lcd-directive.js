(function (d3) {
    'use strict';
    /*global angular, console*/

    function AlphanumericLcdDirective() {
        function link(scope, element, attrs) {
            var RECTANGLE_CHAR = '\u0B8F',
                FOREGROUND_CLASS = 'foreground',
                BACKGROUND_CLASS = 'background',
                lcdGroup = d3.select(element[0]),
                lineIterator,
                fontHeight = 18,
                yPosition,
                rows = parseInt(scope.rows, 10) || 2,
                columns = parseInt(scope.columns, 10) || 16,
                scale = parseFloat(scope.scale) || 1.0,
                x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
            showBackground = scope.showBackground || false;
            function updateLines() {
                var lineNumber,
                    lines = scope.lines;
                for (lineNumber = 0; lineNumber < rows; lineNumber += 1) {
                    if (lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('.' + FOREGROUND_CLASS).data(lines).text(function (data) {
                            return data.substring(0, columns);
                        });
                    }
                }
            }
            scope.$watch('lines', updateLines);
            lcdGroup.prependTranslate(x, y);
            for (lineIterator = 0; lineIterator < rows; lineIterator += 1) {
                yPosition = fontHeight * (lineIterator + 1);
                lcdGroup.append('text').classed(FOREGROUND_CLASS, true).attr('y', yPosition).prependScale(scale);
                if (showBackground) {
                    lcdGroup.append('text').classed(BACKGROUND_CLASS, true).attr('y', yPosition).prependScale(scale).data(RECTANGLE_CHAR).text(function (data) {
                        var arr = [];
                        arr.length = columns + 1;
                        return arr.join(data);
                    });
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
} (window.d3));