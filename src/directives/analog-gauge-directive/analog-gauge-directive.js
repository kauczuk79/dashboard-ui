(function () {
    'use strict';
    /*global angular, console*/

    function AnalogGaugeDirective() {
        function link(scope, element, attrs) {
            function updateGaugeAngle() {
                if (scope.value <= scope.minValue) {
                    scope.angle = scope.startAngle;
                } else if (scope.value >= scope.maxValue) {
                    scope.angle = scope.endAngle;
                } else {
                    //                    if (scope.startAngle < scope.endAngle) {
                    //                        //clockwise
                    //                         
                    //                    } else if (scope.startAngle > scope.endAngle) {
                    //                        //counter clockwise
                    //
                    //                    } else {
                    //                        //start angle and end angle are equal
                    //                        scope.angle = scope.startAngle;
                    //                    }
                    scope.angle = scope.startAngle + (((scope.endAngle - scope.startAngle) / (scope.maxValue - scope.minValue)) * scope.value);
                }
            }

            if (scope.endAngle === undefined) {
                scope.endAngle = scope.startAngle * -1;
            }
            if (scope.minValue === undefined) {
                scope.minValue = 0;
            }
            if (scope.valueStep === undefined) {
                scope.valueStep = 20;
            }
            updateGaugeAngle();

            scope.$watch('value', function () {
                updateGaugeAngle();
            }, true);
        }

        return {
            link: link,
            restrict: 'E',
            template: 'startAngle: {{startAngle}}, endAngle: {{endAngle}}, minValue: {{minValue}}, maxValue: {{maxValue}}, valueStep: {{valueStep}}, value: {{value}}, angle: {{angle}}',
            scope: {
                startAngle: '@',
                endAngle: '@',
                maxValue: '@',
                minValue: '@',
                valueStep: '@',
                value: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('analogGauge', AnalogGaugeDirective);
}());