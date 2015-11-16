(function(d3) {
    'use strict';
    /*global angular, console*/

    function AlphanumericLcdDirective() {
        function link(scope, element, attrs) {
            var rows = parseInt(scope.rows, 10) || 2,
                columns = parseInt(scope.columns, 10) || 16,
                scale = parseFloat(scope.scale, 10) || 1.0,
                lines = scope.lines || [],
                lineIterator = 0,
                fontWidth = 12,
                fontHeight = 18,
                width = columns * fontWidth * scale,
                height = rows * fontHeight * scale,
                svg = d3.select(element[0]).append('svg').attr('width', width).attr('height', height);

            function updateLines() {
                var lineNumber = 0;
                for (; lineNumber < rows; lineNumber += 1) {
                    if (lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('text').data(lines).text(function(d) {
                            return d.substring(0, columns);
                        });
                    }
                }
            }
            for (; lineIterator < rows; lineIterator += 1) {
                svg.append('text').attr("x", 0).attr("y", fontHeight * (lineIterator + 1)).attr('transform', 'scale(' + scale + ')');
            }
            updateLines();
            scope.$watch('lines', function() {
                updateLines();
            }, true);
        }

        return {
            link: link,
            restrict: 'AE',
            scope: {
                rows: '@',
                columns: '@',
                scale: '@',
                background: '@',
                lines: '='
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
}(window.d3));