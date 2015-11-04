(function () {
    'use strict';
    /*global angular, console*/

    function SegmentDisplayDirective() {
        function link(scope, element, attrs) {
            var digits = scope.digits,
                value = scope.value;
            scope.leadingZeros = (attrs.leadingZeros === "true");
        }

        return {
            link: link,
            template: 'Digits: {{digits}}, value: {{value}}, leadingZeros: {{leadingZeros}}',
            scope: {
                digits: '@',
                value: '@'
            }
        };
    }

    angular
        .module('dashboard-ui.directives')
        .directive('segmentDisplay', SegmentDisplayDirective);
}());