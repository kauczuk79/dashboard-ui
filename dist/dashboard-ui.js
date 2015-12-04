(function (d3) {
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
			if((transformOriginX !== undefined && transformOriginY !== undefined) && (transformOriginX !== 0.0 || transformOriginY !== 0.0)) {
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
		return this.style(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY))
	}
	function opacity(opacityLevel) {
		var that = this,
			opacityStr = 'opacity'
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
	
} (window.d3));
(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui', ['ngRoute', 'dashboard-ui.directives']);
} ());
(function () {
	'use strict';
	/*global angular*/

	angular
		.module('dashboard-ui.commons', []);
} ());
(function () {
	'use strict';
	/*global angular*/

	function TemplatesFactory() {
		return {
			segmentDisplayTemplate: '<text seven-segment-display id="background" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="{{opacity}}">{{background}}</text><text id="value" dominant-baseline="text-before-edge" writing-mode="lr">{{value}}</text>'
		};
	}

	angular
		.module('dashboard-ui.commons')
		.factory('templates', TemplatesFactory);
} ());
(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui.directives', ['dashboard-ui.commons']);
} ());
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
(function (d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            var gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node().getBoundingClientRect(),
                svgBBox = d3.select('svg').node().getBoundingClientRect(),
                angle,
                deltaAngle,
                deltaValue;
            function updateGaugeAngle() {
                var value = scope.value;
                if (value < scope.minValue) {
                    angle = scope.startAngle;
                } else if (value > scope.maxValue) {
                    angle = scope.endAngle;
                } else {
                    var angleDifference = Math.abs((deltaAngle / deltaValue) * (scope.minValue - value));
                    if (scope.startAngle < scope.endAngle) {
                        angle = scope.startAngle + angleDifference;
                    } else {
                        angle = scope.startAngle - angleDifference;
                    }
                }
                indicator.rotate(angle);
            }
            scope.x = scope.x || 0.0;
            scope.y = scope.y || 0.0;
            scope.indicatorOriginX = scope.indicatorOriginX || ((indicatorBoundingBox.left + indicatorBoundingBox.right) / 2) - svgBBox.left;
            scope.indicatorOriginY = scope.indicatorOriginY || (indicatorBoundingBox.bottom - svgBBox.top);
            gaugeGroup.prependTranslate(scope.x,scope.y);
            scope.endAngle = scope.endAngle || (scope.startAngle * -1);
            scope.minValue = scope.minValue || 0;
            deltaAngle = scope.endAngle - scope.startAngle;
            deltaValue = scope.maxValue - scope.minValue;
            indicator.transformOrigin(scope.indicatorOriginX, scope.indicatorOriginY).style('transition', 'all 0.25s linear');
            scope.$watch('value', updateGaugeAngle);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                value: '=',
                startAngle: '=',
                endAngle: '=',
                maxValue: '=',
                minValue: '=',
                indicatorOriginX: '=',
                indicatorOriginY: '=',
                x: '=',
                y: '='
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
} (window.d3));
(function (d3) {
	'use strict';
	/*global angular, console*/

	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var EASING_DURATION = 250,
				EASING = 'linear',
				meter = d3.select(element[0]),
				bar = meter.select('#bar'),
				barWidth = parseInt(bar.attr('width')) || 0,
				originalBarX = parseInt(bar.attr('x'), 10) || 0,
				originalBarY = parseInt(bar.attr('y'), 10) || 0,
				stepWidth;
			function updateValue() {
				var value = scope.value || 0,
					barLength = Math.abs(stepWidth * value),
					currentX = 0,
                    currentY = 0,
                    height = 0,
                    width = 0;
				if (value >= 0 && value <= scope.maxValue) {
					currentY = originalBarY - barLength;
					height = barLength;
					currentX = originalBarX;
					width = barLength;
				} else if (value < 0 && value >= scope.minValue) {
					currentY = originalBarY;
					height = barLength;
					currentX = originalBarX - barLength;
					width = barLength;
				} else if (value > scope.maxValue) {
					currentY = scope.maxPosition;
					height = stepWidth * scope.maxValue;
					currentX = originalBarX;
					width = stepWidth * scope.maxValue;
				} else if (value < scope.minValue) {
					currentY = originalBarY;
					height = stepWidth * scope.minValue;
					currentX = scope.minPosition;
					width = stepWidth * scope.minValue;
				}
				if (scope.vertical) {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('y', currentY).attr('height', Math.abs(height));
				} else {
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('x', currentX).attr('width', Math.abs(width));
				}
			}
			scope.x = scope.x || 0;
            scope.y = scope.y || 0;
			scope.vertical = scope.vertical || false;
			scope.minValue = scope.minValue || 0,
			scope.minPosition = scope.minPosition || 0,
			scope.maxPosition = scope.maxPosition || barWidth,
			stepWidth = ((scope.maxPosition - scope.minPosition) / (scope.maxValue - scope.minValue));
			meter.prependTranslate(scope.x,scope.y);
			scope.$watch('value', updateValue);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '=',
				maxValue: '=',
				minPosition: '=',
				maxPosition: '=',
				value: '=',
				vertical: '=',
				x: '=',
				y: '='
			}
		};
	}

	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
} (window.d3));
(function (d3) {
	'use strict';
	/*global angular*/

	function DotMeterDirective() {
		function link(scope, element, attrs) {
			var minValue = parseInt(scope.minValue, 10) || 0,
				maxValue = parseInt(scope.maxValue, 10),
				x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
				dotsCollection = d3.select(element[0]);
			function changeValue() {
				var value = parseInt(scope.value, 10) || 0;
				if (value > maxValue) {
					value = maxValue;
				} else if (value < minValue) {
					value = minValue;
				}
				dotsCollection.selectAll('[id^=dot]')[0].forEach(function(domElement) {
					var opacity = 1.0,
						selection = d3.select(domElement);
					if(parseInt(selection.attr('data-value'), 10) > value) {
						opacity = 0.0;
					}
					selection.opacity(opacity);
				});
				
			}
			dotsCollection.prependTranslate(x, y);
			scope.$watch('value', changeValue);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '@',
				maxValue: '@',
				value: '@',
				x: '@',
				y: '@'
			}
		}
	}

	angular
		.module('dashboard-ui.directives')
		.directive('dotMeter', DotMeterDirective);
} (window.d3));
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
(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval) {
        function link(scope, element, attrs) {
            var x = parseFloat(scope.x) || 0,
                y = parseFloat(scope.y) || 0,
                icon = d3.select(element[0]),
                blinkingInterval = parseInt(scope.blinkingInterval) || 500,
                blinkingDelay = parseInt(scope.blinkingDelay),
                turnOnLevel = parseFloat(scope.turnOnLevel) || 1.0,
                turnOffLevel = parseFloat(scope.turnOffLevel) || 0.0,
                blinkingTimer;
            function turnOn() {
                $interval.cancel(blinkingTimer);
                icon.opacity(turnOnLevel);
            }
            function turnOff() {
                $interval.cancel(blinkingTimer);
                icon.opacity(turnOffLevel);
            }
            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (icon.opacity() === turnOnLevel) {
                        icon.opacity(turnOffLevel);
                    } else {
                        icon.opacity(turnOnLevel);
                    }
                }, blinkingInterval);
            }
            icon.prependTranslate(x, y);
            if (!isNaN(blinkingInterval)) {
                icon.style('transition', 'all ' + (blinkingDelay / 1000) + 's linear 0s');
            }
            scope.$watch('mode', function () {
                if (scope.mode.toLowerCase() === 'on') {
                    turnOn();
                } else if (scope.mode.toLowerCase() === 'blinking') {
                    blinkingMode();
                } else {
                    turnOff();
                }
            });
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
} (window.d3));
(function (d3) {
    'use strict';
    /*global angular, console*/

    function SevenSegmentDisplayDirective(templates) {
        function link(scope, element, attrs) {
            var d3element = d3.select(element[0]),
                iterator;
            scope.x = scope.x || 0,
            scope.y = scope.y || 0,
            scope.showBackground = scope.showBackground || false;
            d3element.prependTranslate(scope.x, scope.y);
            scope.background = '8';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < scope.digits - 1; iterator += 1) {
                scope.background += '.8';
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

    SevenSegmentDisplayDirective.$inject = ['templates'];

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
} (window.d3));