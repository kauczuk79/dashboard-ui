(function (d3) {
	var selectionProto = d3.selection.prototype;
	selectionProto.appendAttr = function (attrName, attrValue) {
		var that = this;
		if (attrName !== undefined && attrValue !== undefined) {
			if (that.attr(attrName) === null) {
				that.attr(attrName, attrValue);
			} else {
				that.attr(attrName, that.attr(attrName) + ' ' + attrValue);
			}
		}
	};
	selectionProto.prependAttr = function (attrName, attrValue) {
		var that = this;
		if (attrName !== undefined && attrValue !== undefined) {
			if (that.attr(attrName) === null) {
				that.attr(attrName, attrValue);
			} else {
				that.attr(attrName, attrValue + ' ' + that.attr(attrName));
			}
		}
	}
} (window.d3));