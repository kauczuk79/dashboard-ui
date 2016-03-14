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
}());
