(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui', ['ngRoute', 'dashboard-ui.directives']);
}());
(function () {
    'use strict';
    /*global angular*/

    angular.module('dashboard-ui.directives', []);
}());
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
(function (d3) {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
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
                    indicator.style('transform-origin', indicatorOriginX + 'px ' + indicatorOriginY + 'px');
                    indicator.style('transform', 'rotate(' + angle + 'deg)');
                }
            }
            gaugeGroup.attr('transform', 'translate(' + attrs.x + ',' + attrs.y + ')');
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

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
}(window.d3));
(function (d3) {
	'use strict';
	/*global angular, console*/
	
	function BarMeterDirective() {
		function link(scope, element, attrs) {
			var bar = d3.select(element[0]).select('#bar'),
				bbox = bar.node().getBBox()
			function calculatePercent(value) {
				return (value / (scope.max - scope.min));
			}
			bar.style('transform-origin', bbox.x+'px '+bbox.y+'px');
			scope.$watch('value', function () {
				var widthScale = calculatePercent(scope.value);
				if(parseInt(scope.value) < parseInt(scope.min)) {
					widthScale = calculatePercent(scope.min);
				} else if (parseInt(scope.value) > parseInt(scope.max)) {
					widthScale = calculatePercent(scope.max);
				}
				d3.select(element[0]).select('#bar').transition().duration(250).ease("linear").attr('transform', 'scale('+widthScale+',1)');
			});
		}
		
		return {
			link: link,
			restrict: 'C',
			scope: {
				min: '@',
				max: '@',
				value: '@'
			}
		}
	}
	
	angular
		.module('dashboard-ui.directives')
		.directive('barMeter', BarMeterDirective);
}(window.d3));
(function(d3) {
    'use strict';
    /*global angular, console*/

    function FourteenSegmentDisplayDirective() {
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
            scope.$watch('value', function() {
                var width = d3.select(element[0]).select('text#background').node().getBBox().width;
                d3.select(element[0]).select('text#value').attr('transform','translate('+width+',0)');
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

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
}(window.d3));
(function (d3) {
    'use strict';
    /*global angular, console*/

    function SevenSegmentDisplayDirective() {
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
            scope.$watch('value', function() {
                var width = d3.select(element[0]).select('text#background').node().getBBox().width;
                d3.select(element[0]).select('text#value').attr('transform','translate('+width+',0)');
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

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SevenSegmentDisplayDirective);
}(window.d3));