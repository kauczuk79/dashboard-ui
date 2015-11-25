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
			},
			appendTransform: function (newTransform, oldTransform) {
				var oldT = (oldTransform === undefined || oldTransform === null)? '' : oldTransform;
				return oldT + newTransform;
			},
			prependTransform: function (newTransform, oldTransform) {
				var oldT = (oldTransform === undefined || oldTransform === null)? '' : oldTransform;
				return newTransform + oldT;
			},
		};
	}

	angular
		.module('dashboard-ui.commons')
		.factory('svgUtils', SvgUtilsFactory);
} ());