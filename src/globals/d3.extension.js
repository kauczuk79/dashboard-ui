(function (d3) {
	var TRANSFORM_ATTR = 'transform',
		selectionProto = d3.selection.prototype,
		transitionProto = d3.transition.prototype;
	function scaleString(scaleFactorX, scaleFactorY) {
		var scaleStr = 'scale(';
		if (scaleFactorX !== undefined) {
			if (scaleFactorY !== undefined && scaleFactorY !== 1.0) {
				scaleStr += scaleFactorX + ',' + scaleFactorY;
			} else {
				if (scaleFactorX === 1.0) {
					return '';
				}
				scaleStr += scaleFactorX;
			}
		}
		return scaleStr + ')';
	}
	function translateString(translateFactorX, translateFactorY) {
		var translateStr = 'translate(';
		if (translateFactorX !== undefined) {
			if (translateFactorY !== undefined && translateFactorY !== 0.0) {
				translateStr += translateFactorX + ',' + translateFactorY;
			} else {
				if (translateFactorX === 0.0) {
					return '';
				}
				translateStr += translateFactorX;
			}
		}
		return translateStr + ')';
	}
	function rotateString(rotateAngle, transformOriginX, transformOriginY) {
		var rotateStr = 'rotate(';
		if (rotateAngle !== undefined) {
			rotateStr += rotateAngle + 'deg';
			if((transformOriginX !== undefined && transformOriginY !== undefined) && (transformOriginX !== 0.0 || transformOriginY !== 0.0)) {
				rotateStr += ',' + transformOriginX + ',' + transformOriginY;
			}
		} else {
			return '';
		}
		return rotateStr + ')';
	}
	function addAttr(d3element, attrName, attrValue, prepend) {
		if (attrName !== undefined && attrValue !== undefined) {
			if (attrValue === '') {
				return;
			}
			if (d3element.attr(attrName) === null) {
				d3element.attr(attrName, attrValue);
			} else {
				if (prepend === undefined || !prepend) {
					d3element.attr(attrName, d3element.attr(attrName) + ' ' + attrValue);
				} else {
					d3element.attr(attrName, attrValue + ' ' + d3element.attr(attrName));
				}
			}
		}
	}
	function appendAttr(attrName, attrValue) {
		addAttr(this, attrName, attrValue);
		return this;
	}
	function prependAttr(attrName, attrValue) {
		addAttr(this, attrName, attrValue, true);
		return this;
	}
	function prependScale(scaleFactorX, scaleFactorY) {
		return this.prependAttr(TRANSFORM_ATTR, scaleString(scaleFactorX, scaleFactorY));
	}
	function appendScale(scaleFactorX, scaleFactorY) {
		return this.appendAttr(TRANSFORM_ATTR, scaleString(scaleFactorX, scaleFactorY));
	}
	function scale(scaleFactorX, scaleFactorY) {
		return this.attr(TRANSFORM_ATTR, scaleString(scaleFactorX, scaleFactorY));
	}
	function prependTranslate(translateFactorX, translateFactorY) {
		return this.prependAttr(TRANSFORM_ATTR, translateString(translateFactorX, translateFactorY));
	}
	function appendTranslate(translateFactorX, translateFactorY) {
		return this.appendAttr(TRANSFORM_ATTR, translateString(translateFactorX, translateFactorY));
	}
	function translate(translateFactorX, translateFactorY) {
		return this.attr(TRANSFORM_ATTR, translateString(translateFactorX, translateFactorY));
	}
	function prependRotate(rotateAngle, transformOriginX, transformOriginY) {
		return this.prependAttr(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY));
	}
	function appendRotate(rotateAngle, transformOriginX, transformOriginY) {
		return this.appendAttr(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY));
	}
 	function rotate(rotateAngle, transformOriginX, transformOriginY) {
		return this.style(TRANSFORM_ATTR, rotateString(rotateAngle, transformOriginX, transformOriginY))
	}
	function opacity(opacityLevel) {
		var that = this,
			opacityStr = 'opacity'
		if (opacityLevel === undefined) {
			return parseFloat(that.style(opacityStr));
		} else {
			return that.style(opacityStr, opacityLevel);
		}
	}
	function transformOrigin(originX, originY) {
		return this.style('transform-origin', originX + 'px ' + originY + 'px')
	}
	selectionProto.appendAttr = appendAttr;
	selectionProto.prependAttr = prependAttr;
	transitionProto.appendAttr = appendAttr;
	transitionProto.prependAttr = prependAttr;
	
	//Selection transform
	selectionProto.prependScale = prependScale;
	selectionProto.appendScale = appendScale;
	selectionProto.scale = scale;
	selectionProto.prependTranslate = prependTranslate;
	selectionProto.appendTranslate = appendTranslate;
	selectionProto.translate = translate;
	selectionProto.prependRotate = prependRotate;
	selectionProto.appendRotate = appendRotate;
	selectionProto.rotate = rotate;
	selectionProto.opacity = opacity;
	selectionProto.transformOrigin = transformOrigin;
	
	//Animation transform
	transitionProto.prependScale = prependScale;
	transitionProto.appendScale = appendScale;
	transitionProto.scale = scale;
	transitionProto.prependTranslate = prependTranslate;
	transitionProto.appendTranslate = appendTranslate;
	transitionProto.translate = translate;
	transitionProto.prependRotate = prependRotate;
	transitionProto.appendRotate = appendRotate;
	transitionProto.rotate = rotate;
	transitionProto.opacity = opacity;
	transitionProto.transformOrigin = transformOrigin;
	
} (window.d3));