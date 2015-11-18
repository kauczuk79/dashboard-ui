(function () {
    'use strict';
    /*global angular, console*/

    function FourteenSegmentDisplayDirective() {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                value = scope.value,
                background = (attrs.showBackground === "true"),
                iterator;
            scope.background = '';
            if (background) {
                scope.background = '~';
                for (iterator = 0; iterator < digits - 1; iterator += 1) {
                    scope.background += '.~';
                }
            }
        }

        return {
            link: link,
            restrict: 'C',
            template: '<text class="digits" text-anchor="end" dominant-baseline="text-before-edge" fill="black" opacity="0.1">{{background}}</text><text class="digits" text-anchor="end" dominant-baseline="text-before-edge" writing-mode="rl">{{value}}</text>',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('fourteenSegmentDisplay', FourteenSegmentDisplayDirective);
}());