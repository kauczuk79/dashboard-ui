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

	function SvgUtilsFactory() {
		return {
			transformAttr: 'transform',
			transformOriginAttr: 'transform-origin',
			opacityStyle: 'opacity',
			translateString: function (x, y) {
                return 'translate(' + x + ', ' + y + ')';
            },
            scaleString: function (scale) {
                return 'scale(' + scale + ')';
            },
			rotateString: function (angle) {
				return 'rotate(' + angle + 'deg)';
			},
			transformOriginString: function (indicatorOriginX, indicatorOriginY) {
				return indicatorOriginX + 'px ' + indicatorOriginY + 'px';
			}
		};
	}

	angular
		.module('dashboard-ui.commons')
		.factory('svgUtils', SvgUtilsFactory);
} ());
(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui.directives', ['dashboard-ui.commons']);
} ());
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
                lineIterator,
                fontHeight = 18,
                lcdGroup = d3.select(element[0]).attr(svgUtils.transformAttr, svgUtils.translateString(attrs.x, attrs.y));
            function updateLines() {
                var lineNumber;
                for (lineNumber = 0; lineNumber < rows; lineNumber += 1) {
                    if (scope.lines[lineNumber] !== undefined) {
                        d3.select(element[0]).selectAll('.' + FOREGROUND_CLASS).data(scope.lines).text(function (d) {
                            return d.substring(0, columns);
                        });
                    }
                }
            }
            for (lineIterator = 0; lineIterator < rows; lineIterator += 1) {
                lcdGroup.append('text').attr('class', FOREGROUND_CLASS).attr('x', 0).attr('y', fontHeight * (lineIterator + 1)).attr(svgUtils.transformAttr, svgUtils.scaleString(scale));
                if (scope.showBackground === 'true') {
                    lcdGroup.append('text').attr('class', BACKGROUND_CLASS).attr('x', 0).attr('y', fontHeight * (lineIterator + 1)).attr(svgUtils.transformAttr, svgUtils.scaleString(scale)).data(RECTANGLE_CHAR).text(function (d) {
                        var arr = [];
                        arr.length = columns + 1;
                        return arr.join(d);
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
(function (d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective(svgUtils) {
        function link(scope, element, attrs) {
            var startAngle = parseInt(scope.startAngle, 10),
                maxValue = parseInt(scope.maxValue, 10),
                endAngle = parseInt(scope.endAngle, 10) || (startAngle * -1),
                minValue = parseInt(scope.minValue, 10) || 0,
                gaugeGroup = d3.select(element[0]),
                indicator = gaugeGroup.select('#indicator'),
                indicatorBoundingBox = indicator.node().getBBox(),
                indicatorOriginX = scope.indicatorOriginX || (indicatorBoundingBox.x + (indicatorBoundingBox.width / 2)),
                indicatorOriginY = scope.indicatorOriginY || (indicatorBoundingBox.y + (indicatorBoundingBox.height / 2)),
                angle,
                deltaAngle = 0,
                deltaValue = maxValue - minValue;

            function updateGaugeAngle() {
                var value = parseInt(scope.value, 10);
                if (value < minValue) {
                    angle = startAngle;
                } else if (value > maxValue) {
                    angle = endAngle;
                } else {
                    deltaAngle = Math.abs(endAngle - startAngle);
                    if (startAngle < endAngle) {
                        //clockwise
                        angle = startAngle + Math.abs((deltaAngle / deltaValue) * (minValue - value));
                    } else {
                        //counter clockwise
                        angle = startAngle - Math.abs((deltaAngle / deltaValue) * (minValue - value));
                    }
                    indicator.style(svgUtils.transformOriginAttr, svgUtils.transformOriginString(indicatorOriginX, indicatorOriginY));
                    indicator.style(svgUtils.transformAttr, svgUtils.rotateString(angle));
                }
            }
            gaugeGroup.attr(svgUtils.transformAttr, svgUtils.translateString(attrs.x, attrs.y));
            scope.$watch('value', function () {
                updateGaugeAngle();
            }, true);
        }

        return {
            link: link,
            restrict: 'C',
            scope: {
                value: '@',
                startAngle: '@',
                endAngle: '@',
                maxValue: '@',
                minValue: '@',
                indicatorOriginX: '@',
                indicatorOriginY: '@'
            }
        };
    }

    AnalogGaugeDirective.$inject = ['svgUtils'];

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
				bar = d3.select(element[0]).select('#bar'),
				vertical = (scope.vertical === 'true') || false,
				originalX = parseInt(bar.attr('x'), 10),
				originalY = parseInt(bar.attr('y'), 10),
				maxPosition = parseInt(scope.maxPosition, 10),
				minPosition = parseInt(scope.minPosition, 10),
				minValue = parseInt(scope.minValue, 10),
				maxValue = parseInt(scope.maxValue, 10),
				stepWidth = ((maxPosition - minPosition) / (maxValue - minValue));
			scope.$watch('value', function () {
				var value = parseInt(scope.value, 10),
					barLength = Math.abs(stepWidth * value),
					x,
                    y,
                    height,
                    width;
				if (vertical) {
					if (value >= 0 && value <= maxValue) {
						y = originalY - barLength;
						height = barLength;
					} else if (value < 0 && value >= minValue) {
						y = originalY;
						height = barLength;
					} else if (value > maxValue) {
						y = maxPosition;
						height = stepWidth * maxValue;
					} else if (value < minValue) {
						y = originalY;
						height = stepWidth * minValue;
					}
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('y', y).attr('height', Math.abs(height));
				} else {
					if (value >= 0 && value <= maxValue) {
						x = originalX;
						width = barLength;
					} else if (value < 0 && value >= minValue) {
						x = originalX - barLength;
						width = barLength;
					} else if (value > maxValue) {
						x = originalX;
						width = stepWidth * maxValue;
					} else if (value < minValue) {
						x = minPosition;
						width = stepWidth * minValue;
					}
					bar.transition().duration(EASING_DURATION).ease(EASING).attr('x', x).attr('width', Math.abs(width));
				}
			});
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '@',
				maxValue: '@',
				minPosition: '@',
				maxPosition: '@',
				value: '@',
				vertical: '@'
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

	function DotBarMeterDirective() {
		function link(scope, element, attrs) {
			var minValue = parseInt(scope.minValue, 10) || 0,
				maxValue = parseInt(scope.maxValue, 10),
				dotsCollection = d3.select(element[0]);
			function changeValue() {
				var value = parseInt(scope.value, 10);
				if (value > maxValue) {
					value = maxValue;
				}
				if (value < minValue) {
					value = minValue;
				}
				dotsCollection.selectAll('[id^=dot]')[0].forEach(function(domElement) {
					var opacity = 1.0;
					if(parseInt(domElement.attributes['data-value'].value, 10) > value) {
						opacity = 0.0
					}
					d3.select(domElement).style('opacity', opacity);
				});
				
			}
			scope.$watch('value', function () {
				changeValue();
			}, true);
		}

		return {
			link: link,
			restrict: 'C',
			scope: {
				minValue: '@',
				maxValue: '@',
				value: '@'
			}
		}
	}

	angular
		.module('dashboard-ui.directives')
		.directive('dotBarMeter', DotBarMeterDirective);
} (window.d3));
(function (d3) {
    'use strict';
    /*global angular, console*/

    function FourteenSegmentDisplayDirective(svgUtils) {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '~';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < digits - 1; iterator += 1) {
                scope.background += '.~';
            }
            if (background) {
                scope.opacity = 0.1;
            }
            scope.$watch('value', function () {
                var width = d3.select(element[0]).select('text#background').node().getBBox().width;
                d3.select(element[0]).select('text#value').attr(svgUtils.transformAttr, svgUtils.translateString(width, 0));
            }, true);
        }

        return {
            link: link,
            restrict: 'C',
            template: '<text id="background" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="{{opacity}}">{{background}}</text><text id="value" dominant-baseline="text-before-edge" writing-mode="lr">{{value}}</text>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    FourteenSegmentDisplayDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
} (window.d3));
(function (d3) {
    'use strict';
    /*global angular*/

    function LedLightDirective($interval, svgUtils) {
        function link(scope, element, attrs) {
            var icon = d3.select(element[0]),
                blinkingTime = parseInt(scope.blinkingTime) || 25,
                turnOnLevel = parseFloat(scope.turnOnLevel) || 1.0,
                turnOffLevel = parseFloat(scope.turnOffLevel) || 0.0,
                blinkingTimer;
            function setOpacity(opacity) {
                icon.transition().duration(blinkingTime).style(svgUtils.opacityStyle, opacity);
            }
            function isVisible() {
                return parseFloat(icon.style(svgUtils.opacityStyle)) === turnOnLevel;
            }
            function turnOn() {
                $interval.cancel(blinkingTimer);
                setOpacity(turnOnLevel);
            }
            function turnOff() {
                $interval.cancel(blinkingTimer);
                setOpacity(turnOffLevel);
            }
            function blinkingMode() {
                blinkingTimer = $interval(function () {
                    if (isVisible()) {
                        setOpacity(turnOffLevel);
                    } else {
                        setOpacity(turnOnLevel);
                    }
                }, 500);
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
                blinkingTime: '@'
            }
        };
    }

    LedLightDirective.$inject = ['$interval', 'svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('ledLight', LedLightDirective);
} (window.d3));
(function (d3) {
    'use strict';
    /*global angular, console*/

    function SevenSegmentDisplayDirective(svgUtils) {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '8';
            scope.opacity = 0.0;
            for (iterator = 0; iterator < digits - 1; iterator += 1) {
                scope.background += '.8';
            }
            if (background) {
                scope.opacity = 0.1;
            }
            scope.$watch('value', function () {
                var width = d3.select(element[0]).select('text#background').node().getBBox().width;
                d3.select(element[0]).select('text#value').attr(svgUtils.transformAttr, svgUtils.translateString(width, 0));
            }, true);
        }

        return {
            link: link,
            restrict: 'C',
            template: '<text id="background" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="{{opacity}}">{{background}}</text><text id="value" dominant-baseline="text-before-edge" writing-mode="lr">{{value}}</text>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    SevenSegmentDisplayDirective.$inject = ['svgUtils'];

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
} (window.d3));