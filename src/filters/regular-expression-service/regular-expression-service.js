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
