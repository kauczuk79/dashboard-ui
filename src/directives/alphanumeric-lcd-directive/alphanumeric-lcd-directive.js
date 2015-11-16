(function(d3) {
    'use strict';
    /*global angular, console*/

    function AlphanumericLcdDirective() {
        function link(scope, element, attrs) {
            var rows = parseInt(scope.rows, 10) || 2,
                columns = parseInt(scope.columns, 10) || 16,
                scale = parseFloat(scope.scale, 10) || 1.0,
                lineIterator = 0,
                fontHeight = 18,
                lcdGroup = d3.select(element[0]).attr('transform','translate('+attrs.x+', '+attrs.y+')'),
                rectChar = '\u0B8F';
            function updateLines() {
                var lineNumber = 0;
                for (; lineNumber < rows; lineNumber += 1) {
                    if (scope.lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('.foreground').data(scope.lines).text(function(d) {
                            return d.substring(0, columns);
                        });
                    }
                }
            }
            for (; lineIterator < rows; lineIterator += 1) {
                lcdGroup.append('text').attr('class', 'foreground').attr('x', 0).attr('y', fontHeight * (lineIterator + 1)).attr('transform', 'scale(' + scale + ')');
                if(scope.showBackground === 'true') {
                    var background = lcdGroup.append('text').attr('class', 'background').attr('x', 0).attr('y', fontHeight * (lineIterator + 1)).attr('transform', 'scale(' + scale + ')');
                    background.data(rectChar).text(function(d) {
                        return new Array(columns + 1).join(d);
                    });
                }
            }
            updateLines();
            scope.$watch('lines', function() {
                updateLines();
            }, true);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                rows: '@',
                columns: '@',
                scale: '@',
                showBackground: '@',
                lines: '='
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
}(window.d3));