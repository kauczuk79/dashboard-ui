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
