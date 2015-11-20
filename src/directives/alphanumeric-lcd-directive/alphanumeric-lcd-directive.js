(function (d3) {
    'use strict';
    /*global angular, console*/

    function AlphanumericLcdDirective(svgUtils) {
        function link(scope, element, attrs) {
            var RECTANGLE_CHAR = '\u0B8F',
                FOREGROUND_CLASS = 'foreground',
                BACKGROUND_CLASS = 'background',
                rows = parseInt(scope.rows, 10) || 2,
                columns = parseInt(scope.columns, 10) || 16,
                scale = parseFloat(scope.scale, 10) || 1.0,
                lineIterator = 0,
                fontHeight = 18,
                lcdGroup = d3.select(element[0]).attr(svgUtils.transformAttr, svgUtils.translateString(attrs.x, attrs.y));
            function updateLines() {
                var lineNumber = 0;
                for (; lineNumber < rows; lineNumber += 1) {
                    if (scope.lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('.' + FOREGROUND_CLASS).data(scope.lines).text(function (d) {
                            return d.substring(0, columns);
                        });
                    }
                }
            }
            for (; lineIterator < rows; lineIterator += 1) {
                lcdGroup.append('text').attr('class', FOREGROUND_CLASS).attr('x', 0).attr('y', fontHeight * (lineIterator + 1)).attr(svgUtils.transformAttr, svgUtils.scaleString(scale));
                if (scope.showBackground === 'true') {
                    var background = lcdGroup.append('text').attr('class', BACKGROUND_CLASS).attr('x', 0).attr('y', fontHeight * (lineIterator + 1)).attr(svgUtils.transformAttr, svgUtils.scaleString(scale));
                    background.data(RECTANGLE_CHAR).text(function (d) {
                        return new Array(columns + 1).join(d);
                    });
                }
            }
            updateLines();
            scope.$watch('lines', function () {
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

    AlphanumericLcdDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
} (window.d3));