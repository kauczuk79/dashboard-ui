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
                x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
                showBackground = (scope.showBackground === 'true'),
                lcdGroup = d3.select(element[0]),
                lineIterator,
                fontHeight = 18,
                yPosition;
            function updateLines() {
                var lineNumber;
                for (lineNumber = 0; lineNumber < rows; lineNumber += 1) {
                    if (scope.lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('.'+FOREGROUND_CLASS).data(scope.lines).text(function (data) {
                            return data.substring(0, columns);
                        });
                    }
                }
            }
            lcdGroup.attr(svgUtils.transformAttr, svgUtils.prependTransform(svgUtils.translateString(x, y), lcdGroup.attr(svgUtils.transformAttr)));
            for (lineIterator = 0; lineIterator < rows; lineIterator += 1) {
                yPosition = fontHeight * (lineIterator + 1);
                lcdGroup.append('text').classed(FOREGROUND_CLASS, true).attr('y', yPosition).attr(svgUtils.transformAttr, svgUtils.scaleString(scale));
                if (showBackground) {
                    lcdGroup.append('text').classed(BACKGROUND_CLASS, true).attr('y', yPosition).attr(svgUtils.transformAttr, svgUtils.scaleString(scale)).data(RECTANGLE_CHAR).text(function (data) {
                        var arr = [];
                        arr.length = columns + 1;
                        return arr.join(data);
                    });
                }
            }
            scope.$watch('lines', updateLines);
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

    AlphanumericLcdDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
} (window.d3));