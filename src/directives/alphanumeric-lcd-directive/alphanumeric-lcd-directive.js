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
                yPosition;
            function updateLines() {
                var lineNumber,
                    lines = scope.lines;
                for (lineNumber = 0; lineNumber < scope.rows; lineNumber += 1) {
                    if (lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('.' + FOREGROUND_CLASS).data(lines).text(function (data) {
                            return data.substring(0, scope.columns);
                        });
                    }
                }
            }
            scope.rows = scope.rows || 2;
            scope.columns = scope.columns || 16;
            scope.scale = scope.scale || 1.0;
            scope.x = scope.x || 0;
            scope.y = scope.y || 0;
            scope.showBackground = scope.showBackground || false;
            scope.$watch('lines', updateLines);
            lcdGroup.prependTranslate(scope.x, scope.y);
            for (lineIterator = 0; lineIterator < scope.rows; lineIterator += 1) {
                yPosition = fontHeight * (lineIterator + 1);
                lcdGroup.append('text').classed(FOREGROUND_CLASS, true).attr('y', yPosition).prependScale(scope.scale);
                if (scope.showBackground) {
                    lcdGroup.append('text').classed(BACKGROUND_CLASS, true).attr('y', yPosition).prependScale(scope.scale).data(RECTANGLE_CHAR).text(function (data) {
                        var arr = [];
                        arr.length = scope.columns + 1;
                        return arr.join(data);
                    });
                }
            }
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                rows: '=',
                columns: '=',
                scale: '=',
                showBackground: '=',
                lines: '=',
                x: '=',
                y: '='
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
} (window.d3));