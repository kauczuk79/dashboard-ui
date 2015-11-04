(function () {
    'use strict';
    /*global angular, console*/

    function SegmentDisplayDirective() {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                value = scope.value,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '';
            if (background) {
                scope.background = '8';
                for (iterator = 0; iterator < digits - 1; iterator += 1) {
                    scope.background += '.8';
                }
            }
        }

        return {
            link: link,
            restrict: 'E',
            template: '<span class="background">{{background}}</span><span class="foreground">{{value}}</span>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('sevenSegmentDisplay', SegmentDisplayDirective);
}());