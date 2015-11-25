(function (d3) {
	d3.selection.prototype.appendAttr = function (attrName, attrValue) {
		if (attrName !== undefined && attrValue !== undefined) {
			if (this.attr(attrName) === null) {
				this.attr(attrName, attrValue);
			} else {
				this.attr(attrName, this.attr(attrName) + ' ' + attrValue);
			}
		}
	};
	d3.selection.prototype.prependAttr = function (attrName, attrValue) {
		if (attrName !== undefined && attrValue !== undefined) {
			if (this.attr(attrName) === null) {
				this.attr(attrName, attrValue);
			} else {
				this.attr(attrName, attrValue + ' ' + this.attr(attrName));
			}
		}
	}
} (window.d3));