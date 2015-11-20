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