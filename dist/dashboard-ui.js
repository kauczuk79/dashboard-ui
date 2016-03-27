/*global window*/
(function (d3) {
    'use strict';
    /*jshint validthis:true */
    var TRANSFORM_ATTR = 'transform',
        selectionProto = d3.selection.prototype,
        transitionProto = d3.transition.prototype;

    function scaleString(scaleFactorX, scaleFactorY) {
        var scaleStr = 'scale(';
        if (scaleFactorX !== undefined) {
            if (scaleFactorY !== undefined && scaleFactorY !== 1.0) {
                scaleStr += scaleFactorX + ',' + scaleFactorY;
            } else {
                if (scaleFactorX === 1.0) {
                    return '';
                }
                scaleStr += scaleFactorX;
            }
        }
        return scaleStr + ')';
    }

    function translateString(translateFactorX, translateFactorY) {
        var translateStr = 'translate(';
        if (translateFactorX !== undefined) {
            if (translateFactorY !== undefined && translateFactorY !== 0.0) {
                translateStr += translateFactorX + ',' + translateFactorY;
            } else {
                if (translateFactorX === 0.0) {
                    return '';
                }
                translateStr += translateFactorX;
            }
        }
        return translateStr + ')';
    }

    function rotateString(rotateAngle, transformOriginX, transformOriginY) {
        var rotateStr = 'rotate(';
        if (rotateAngle !== undefined) {
            rotateStr += rotateAngle + 'deg';
            if ((transformOriginX !== undefined && transformOriginY !== undefined) && (transformOriginX !== 0.0 || transformOriginY !== 0.0)) {
                rotateStr += ',' + transformOriginX + ',' + transformOriginY;
            }
        } else {
            return '';
        }
        return rotateStr + ')';
    }

    function addAttr(d3element, attrName, attrValue, prepend) {
        if (attrName !== undefined && attrValue !== undefined) {
            if (attrValue === '') {
                return;
            }
            if (d3element.attr(attrName) === null) {
                d3element.attr(attrName, attrValue);
            } else {
                if (prepend === undefined || !prepend) {
                    d3element.attr(attrName, d3element.attr(attrName) + ' ' + attrValue);
                } else {
                    d3element.attr(attrName, attrValue + ' ' + d3element.attr(attrName));
                }
            }
        }
    }

    function appendAttr(attrName, attrValue) {
        addAttr(this, attrName, attrValue);
        return this;
    }

    function prependAttr(attrName, attrValue) {
        addAttr(this, attrName, attrValue, true);
        return this;
    }

    function prependScale(scaleFactorX, scaleFactorY) {
        return this.prependAttr(TRANSFORM_ATTR, scaleString(scaleFactorX, scaleFactorY));
    }

    function appendScale(scaleFactorX, scaleFactorY) {
        return this.appendAttr(TRANSFORM_ATTR, scaleString(scaleFactorX, scaleFactorY));
    }

    function scale(scaleFactorX, scaleFactorY) {
        return this.attr(TRANSFORM_ATTR, scaleString(scaleFactorX, scaleFactorY));
    }

    function prependTranslate(translateFactorX, translateFactorY) {
        return this.prependAttr(TRANSFORM_ATTR, translateString(translateFactorX, translateFactorY));
    }

    function appendTranslate(translateFactorX, translateFactorY) {
        return this.appendAttr(TRANSFORM_ATTR, translateString(translateFactorX, translateFactorY));
    }

    function translate(translateFactorX, translateFactorY) {
        return this.attr(TRANSFORM_ATTR, translateString(translateFactorX, translateFactorY));
    }

    function prependRotate(rotateAngle, transformOriginX, transformOriginY) {
        return this.prependAttr(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY));
    }

    function appendRotate(rotateAngle, transformOriginX, transformOriginY) {
        return this.appendAttr(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY));
    }

    function rotate(rotateAngle, transformOriginX, transformOriginY) {
        return this.style(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY));
    }

    function opacity(opacityLevel) {
        var that = this,
            opacityStr = 'opacity';
        if (opacityLevel === undefined) {
            return parseFloat(that.style(opacityStr));
        } else {
            return that.style(opacityStr, opacityLevel);
        }
    }

    function transformOrigin(originX, originY) {
        return this.style('transform-origin', originX + 'px ' + originY + 'px');
    }
    selectionProto.appendAttr = appendAttr;
    selectionProto.prependAttr = prependAttr;
    transitionProto.appendAttr = appendAttr;
    transitionProto.prependAttr = prependAttr;

    //Selection transform
    selectionProto.prependScale = prependScale;
    selectionProto.appendScale = appendScale;
    selectionProto.scale = scale;
    selectionProto.prependTranslate = prependTranslate;
    selectionProto.appendTranslate = appendTranslate;
    selectionProto.translate = translate;
    selectionProto.prependRotate = prependRotate;
    selectionProto.appendRotate = appendRotate;
    selectionProto.rotate = rotate;
    selectionProto.opacity = opacity;
    selectionProto.transformOrigin = transformOrigin;

    //Animation transform
    transitionProto.prependScale = prependScale;
    transitionProto.appendScale = appendScale;
    transitionProto.scale = scale;
    transitionProto.prependTranslate = prependTranslate;
    transitionProto.appendTranslate = appendTranslate;
    transitionProto.translate = translate;
    transitionProto.prependRotate = prependRotate;
    transitionProto.appendRotate = appendRotate;
    transitionProto.rotate = rotate;
    transitionProto.opacity = opacity;
    transitionProto.transformOrigin = transformOrigin;

}(window.d3));

(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui', ['ngRoute', 'dashboard-ui.directives']);
}());

(function () {
    'use strict';
    /*global angular*/

    angular
        .module('dashboard-ui.commons', []);
}());

(function () {
    'use strict';
    /*global angular*/

    function TemplatesFactory() {
        return {
            segmentDisplayTemplate: '<text seven-segment-display id="background" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="{{opacity}}">{{background}}</text><text id="value" dominant-baseline="text-before-edge" writing-mode="lr">{{filteredValue}}</text>'
        };
    }

    angular
        .module('dashboard-ui.commons')
        .factory('templates', TemplatesFactory);
}());

(function () {
    'use strict';
    /*global angular*/
    
    angular.module('dashboard-ui.filters', []);
}());

(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui.directives', ['dashboard-ui.commons', 'dashboard-ui.filters']);
}());

(function () {
    'use strict';
    /*global angular*/
    angular.module('dashboard-ui.filters').filter('alphanumericLcdFilter', ['regularExpressions', function (regularExpressions) {
        return function (input) {
            var position,
                output = '',
                regexpOut,
                regexp = regularExpressions.getAlphanumericLcdRegexp();
            if (input !== undefined) {
                for (position = 0; position < input.length; position += 1) {
                    regexpOut = regexp.exec(input[position]);
                    if (regexpOut !== null) {
                        output += regexpOut[0];
                    }
                }
            }
            return output;
        };
    }]);
}());

(function () {
    'use strict';
    /*global angular*/
    angular.module('dashboard-ui.filters').filter('fourteenSegmentDisplayFilter', ['regularExpressions', function (regularExpressions) {
        return function (input) {
            var position,
                output = '',
                regexpOut,
                regexp = regularExpressions.getFourteenSegmendDisplayRegexp();
            if (input !== undefined) {
                for (position = 0; position < input.length; position += 1) {
                    regexpOut = regexp.exec(input[position]);
                    if (regexpOut !== null) {
                        output += regexpOut[0];
                    }
                }
            }
            return output;
        };
    }]);
}());

(function () {
    'use strict';
    /*global angular*/
    angular.module('dashboard-ui.filters').filter('sevenSegmentDisplayFilter', ['regularExpressions', function (regularExpressions) {
        return function (input) {
            var position,
                output = '',
                regexpOut,
                regexp = regularExpressions.getSevenSegmentDisplayRegexp();
            if (input !== undefined) {
                for (position = 0; position < input.length; position += 1) {
                    regexpOut = regexp.exec(input[position]);
                    if (regexpOut !== null) {
                        output += regexpOut[0];
                    }
                }
            }
            return output;
        };
    }]);
}());

(function () {
    'use strict';
    /*global angular*/

    function regularExpressions() {

        var alphanumericLcdRegexp = /[\u000d\u0020-\u007e\u00a0-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u0b82\u0b83\u0b85\u0b86\u0b87\u0b88\u0b89\u0b8a\u0b8e\u0b8f\u0b90\u0b92\u2014\u2018\u2019\u201a\u201b\u201c\u201d\u201e\u2020\u2022\u2026\u2039\u203a\u20ac\u2122\ufb01\ufb02]{0,}/,
            fourteenSegmentDisplayRegexp = /[\u0022\u0024-\u003a\u003c-\u005a\u005c\u005e-\u007a\u007c\u007e\u00a5\u00a6\u00b1]/,
            sevenSegmentDisplayRegexp = /[\u002d\u002e\u0030-\u003a\u0041-\u005a\u0061-\u007a]/;

        function getAlphanumericLcdRegexp() {
            return alphanumericLcdRegexp;
        }

        function getFourteenSegmendDisplayRegexp() {
            return fourteenSegmentDisplayRegexp;
        }

        function getSevenSegmentDisplayRegexp() {
            return sevenSegmentDisplayRegexp;
        }

        return {
            getAlphanumericLcdRegexp: getAlphanumericLcdRegexp,
            getFourteenSegmendDisplayRegexp: getFourteenSegmendDisplayRegexp,
            getSevenSegmentDisplayRegexp: getSevenSegmentDisplayRegexp
        };
    }

    angular.module('dashboard-ui.filters').service('regularExpressions', regularExpressions);
}());

/*global window, angular*/
(function (d3) {
    'use strict';

    function AlphanumericLcdDirective($filter) {
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
                var filteredString = $filter('alphanumericLcdFilter')(data);
                return filteredString.substring(0, scope.parameters.columns);
            }

            function fillLine(data) {
                var arr = [];
                arr.length = scope.parameters.columns + 1;
                return arr.join(data);
            }

            function updateLines() {
                var lineNumber,
                    lines = scope.lines;
                d3.select(element[0])
                    .selectAll('.' + FOREGROUND_CLASS)
                    .data(lines)
                    .text(trimLine);
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

    AlphanumericLcdDirective.$inject = ['$filter'];

    angular
        .module('dashboard-ui.directives')
        .directive('alphanumericLcd', AlphanumericLcdDirective);
}(window.d3));

/*global window, angular*/
(function (d3) {
    'use strict';

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node()
                    .getBoundingClientRect(),
                svgBBox = d3.select('svg')
                    .node()
                    .getBoundingClientRect(),
                deltaAngle,
                deltaValue;
            scope.parameters = {
                x: parseFloat(scope.x) || 0.0,
                y: parseFloat(scope.y) || 0.0,
                indicatorOriginX: parseFloat(scope.indicatorOriginX) || ((indicatorBoundingBox.left + indicatorBoundingBox.right) / 2) - svgBBox.left,
                indicatorOriginY: parseFloat(scope.indicatorOriginY) || (indicatorBoundingBox.bottom - svgBBox.top),
                startAngle: parseFloat(scope.startAngle) || 0.0,
                endAngle: parseFloat(scope.endAngle) || ((parseFloat(scope.startAngle) || 0.0) * -1),
                minValue: parseFloat(scope.minValue) || 0,
                maxValue: parseFloat(scope.maxValue) || 100.0
            };
            deltaAngle = scope.parameters.endAngle - scope.parameters.startAngle;
            deltaValue = scope.parameters.maxValue - scope.parameters.minValue;

            function updateGaugeAngle() {
                var value = parseFloat(scope.value),
                    angleDifference;
                if (value < scope.parameters.minValue) {
                    indicator.rotate(scope.parameters.startAngle);
                } else if (value > scope.parameters.maxValue) {
                    indicator.rotate(scope.parameters.endAngle);
                } else {
                    angleDifference = Math.abs((deltaAngle / deltaValue) * (scope.parameters.minValue - value));
                    if (scope.parameters.startAngle < scope.parameters.endAngle) {
                        indicator.rotate(scope.parameters.startAngle + angleDifference);
                    } else {
                        indicator.rotate(scope.parameters.startAngle - angleDifference);
                    }
                }
            }
            gaugeGroup.prependTranslate(scope.parameters.x, scope.parameters.y);
            indicator.transformOrigin(scope.parameters.indicatorOriginX, scope.parameters.indicatorOriginY)
                .style('transition', 'all 0.25s linear');
            scope.$watch('value', updateGaugeAngle);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                value: '=',
                startAngle: '@',
                endAngle: '@',
                maxValue: '@',
                minValue: '@',
                indicatorOriginX: '@',
                indicatorOriginY: '@',
                x: '@',
                y: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
}(window.d3));

/*global window, angular*/
(function (d3) {
    'use strict';

    function BarMeterDirective() {
        function link(scope, element, attrs) {
            var EASING_DURATION = 250,
                EASING = 'linear',
                meter = d3.select(element[0]),
                bar = meter.select('#bar'),
                barWidth = parseInt(bar.attr('width'), 10) || 0,
                stepWidth;
            scope.parameters = {
                x: parseFloat(scope.x) || 0.0,
                y: parseFloat(scope.y) || 0.0,
                vertical: scope.vertical === 'true',
                minValue: parseFloat(scope.minValue) || 0.0,
                maxValue: parseFloat(scope.maxValue) || 0.0,
                minPosition: parseFloat(scope.minPosition) || 0.0,
                maxPosition: parseFloat(scope.maxPosition) || barWidth,
                originalBarX: parseFloat(bar.attr('x')) || 0,
                originalBarY: parseFloat(bar.attr('y')) || 0
            };
            stepWidth = ((scope.parameters.maxPosition - scope.parameters.minPosition) / (scope.parameters.maxValue - scope.parameters.minValue));

            function updateValue() {
                var value = parseFloat(scope.value) || 0.0,
                    barLength = Math.abs(stepWidth * value),
                    currentX = 0,
                    currentY = 0,
                    height = 0,
                    width = 0;
                if (value >= 0 && value <= scope.parameters.maxValue) {
                    currentY = scope.parameters.originalBarY - barLength;
                    height = barLength;
                    currentX = scope.parameters.originalBarX;
                    width = barLength;
                } else if (value < 0 && value >= scope.parameters.minValue) {
                    currentY = scope.parameters.originalBarY;
                    height = barLength;
                    currentX = scope.parameters.originalBarX - barLength;
                    width = barLength;
                } else if (value > scope.parameters.maxValue) {
                    currentY = scope.parameters.maxPosition;
                    height = stepWidth * scope.parameters.maxValue;
                    currentX = scope.parameters.originalBarX;
                    width = stepWidth * scope.parameters.maxValue;
                } else if (value < scope.parameters.minValue) {
                    currentY = scope.parameters.originalBarY;
                    height = stepWidth * scope.parameters.minValue;
                    currentX = scope.parameters.minPosition;
                    width = stepWidth * scope.parameters.minValue;
                }
                if (scope.parameters.vertical) {
                    bar.transition()
                        .duration(EASING_DURATION)
                        .ease(EASING)
                        .attr('y', currentY)
                        .attr('height', Math.abs(height));
                } else {
                    bar.transition()
                        .duration(EASING_DURATION)
                        .ease(EASING)
                        .attr('x', currentX)
                        .attr('width', Math.abs(width));
                }
            }
            meter.prependTranslate(scope.parameters.x, scope.parameters.y);
            scope.$watch('value', updateValue);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                minValue: '@',
                maxValue: '@',
                minPosition: '@',
                maxPosition: '@',
                value: '=',
                vertical: '@',
                x: '@',
                y: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('barMeter', BarMeterDirective);
}(window.d3));

/*global window, angular*/
(function (d3) {
    'use strict';

    function DotMeterDirective() {
        function link(scope, element, attrs) {
            var dotsCollection = d3.select(element[0]);
            scope.parameters = {
                maxValue: parseInt(scope.maxValue, 10) || 0,
                minValue: parseInt(scope.minValue, 10) || 0,
                x: parseFloat(scope.x) || 0,
                y: parseFloat(scope.y) || 0
            };

            function updateValue() {
                var value = parseInt(scope.value, 10) || 0;
                if (value > scope.parameters.maxValue) {
                    value = scope.parameters.maxValue;
                } else if (value < scope.parameters.minValue) {
                    value = scope.parameters.minValue;
                }
                dotsCollection.selectAll('[id^=dot]')[0].forEach(function (domElement) {
                    var opacity = 1.0,
                        selection = d3.select(domElement);
                    if (parseInt(selection.attr('data-value'), 10) > value) {
                        opacity = 0.0;
                    }
                    selection.opacity(opacity);
                });
            }
            dotsCollection.prependTranslate(scope.parameters.x, scope.parameters.y);
            scope.$watch('value', updateValue);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                minValue: '@',
                maxValue: '@',
                value: '=',
                x: '@',
                y: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('dotMeter', DotMeterDirective);
}(window.d3));

/*global window, angular*/
(function (d3) {
    'use strict';

    function FourteenSegmentDisplayDirective(templates, $filter) {
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
                scope.filteredValue = $filter('fourteenSegmentDisplayFilter')(scope.value);
            });
            d3element.prependTranslate(scope.parameters.x, scope.parameters.y);
            scope.background = '~';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < scope.parameters.digits - 1; iterator += 1) {
                scope.background += '.~';
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

    FourteenSegmentDisplayDirective.$inject = ['templates', '$filter'];

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
}(window.d3));

/*global window, angular*/
(function (d3) {
    'use strict';

    function LedLightDirective($interval) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                blinkingTimer;
            scope.parameters = {
                y: parseFloat(scope.y) || 0.0,
                x: parseFloat(scope.x) || 0.0,
                blinkingInterval: parseInt(scope.blinkingInterval, 10) || 500,
                blinkingDelay: parseInt(scope.blinkingDelay, 10) || 0,
                turnOnLevel: parseFloat(scope.turnOnLevel) || 1.0,
                turnOffLevel: parseFloat(scope.turnOffLevel) || 0.0
            };

            function turnOn() {
                $interval.cancel(blinkingTimer);
                icon.opacity(scope.parameters.turnOnLevel);
            }

            function turnOff() {
                $interval.cancel(blinkingTimer);
                icon.opacity(scope.parameters.turnOffLevel);
            }

            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (icon.opacity() === scope.parameters.turnOnLevel) {
                        icon.opacity(scope.parameters.turnOffLevel);
                    } else {
                        icon.opacity(scope.parameters.turnOnLevel);
                    }
                }, scope.parameters.blinkingInterval);
            }

            function updateLightMode() {
                if (scope.mode.toLowerCase() === 'on') {
                    turnOn();
                } else if (scope.mode.toLowerCase() === 'blinking') {
                    blinkingMode();
                } else {
                    turnOff();
                }
            }
            icon.prependTranslate(scope.parameters.x, scope.parameters.y);
            if (scope.parameters.blinkingDelay > 0) {
                icon.style('transition', 'all ' + (scope.parameters.blinkingDelay / 1000) + 's linear 0s');
            }
            attrs.$observe('mode', updateLightMode);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                mode: '@',
                turnOffLevel: '@',
                turnOnLevel: '@',
                blinkingInterval: '@',
                blinkingDelay: '@',
                x: '@',
                y: '@'
            }
        };
    }

    LedLightDirective.$inject = ['$interval'];

    angular
        .module('dashboard-ui.directives')
        .directive('ledLight', LedLightDirective);
}(window.d3));

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
